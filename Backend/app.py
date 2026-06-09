from fastapi import FastAPI, File, UploadFile, Request, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from starlette.middleware.trustedhost import TrustedHostMiddleware
import os
import uuid
from typing import List

from file_manager import FileManager
from converter import Converter
from merge import Merger
from compressor import Compressor
from protector import Protector
from split import PdfSpliter
from image_converter import Image_converter

app = FastAPI(title="CloudPDF API", version="1.0.0")


from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware  # noqa
from starlette.datastructures import URL  # noqa

class ProxySchemeMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] in ("http", "websocket"):
            headers = dict(scope.get("headers", []))
            forwarded_proto = headers.get(b"x-forwarded-proto", b"").decode()
            if forwarded_proto in ("https", "http"):
                scope["scheme"] = forwarded_proto
        await self.app(scope, receive, send)

app.add_middleware(ProxySchemeMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Service instances ─────────────────────────────────────────────────────────
file_manager    = FileManager()
converter       = Converter(file_manager)
image_converter = Image_converter(file_manager)
merger          = Merger(file_manager)
compressor      = Compressor(file_manager)
protector       = Protector(file_manager)
spliter         = PdfSpliter(file_manager)


# ─── Helpers ───────────────────────────────────────────────────────────────────
def original_pdf_name(upload_filename: str) -> str:
    """Return <stem>.pdf using the original upload filename (no UUID)."""
    stem = os.path.splitext(os.path.basename(upload_filename))[0]
    return f"{stem}.pdf"


def rename_to_original(generated: str, desired_name: str) -> str:
    """
    Rename the generated file on disk to desired_name (in the same folder).
    If desired_name already exists, a counter suffix is added to avoid collisions.
    Returns the final filename (basename only).
    """
    folder = file_manager.upload_folder
    src = os.path.join(folder, generated)

    base, ext = os.path.splitext(desired_name)
    dst_name = desired_name
    dst = os.path.join(folder, dst_name)

    counter = 1
    while os.path.exists(dst) and dst != src:
        dst_name = f"{base}_{counter}{ext}"
        dst = os.path.join(folder, dst_name)
        counter += 1

    os.rename(src, dst)
    return dst_name


# ─── Health check ──────────────────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    return {"status": "ok"}


# ─── Office → PDF ──────────────────────────────────────────────────────────────
@app.post("/convert")
async def convert_endpoint(
    request: Request,
    files: List[UploadFile] = File(...),
):
    if not files:
        return {"error": "No files provided"}

    pdf_files = []
    for file in files:
        generated = converter.convert_file(file)
        desired   = original_pdf_name(file.filename)
        final     = rename_to_original(generated, desired)
        pdf_files.append(final)

    if len(pdf_files) == 1:
        return {
            "message": "File converted successfully",
            "pdf_file": pdf_files[0],
            "pdf_url": str(request.url_for("download_file", filename=pdf_files[0])),
            "file_count": 1,
        }

    zip_id       = uuid.uuid4().hex
    zip_filename = f"converted_{zip_id}.zip"
    pdf_paths    = [os.path.join(file_manager.upload_folder, f) for f in pdf_files]
    file_manager.create_zip(pdf_paths, zip_filename)

    return {
        "message": "Files converted successfully",
        "zip_file": zip_filename,
        "zip_url": str(request.url_for("download_zip", filename=zip_filename)),
        "file_count": len(pdf_files),
    }


# ─── PDF Merge ─────────────────────────────────────────────────────────────────
@app.post("/merge")
async def merge_endpoint(
    request: Request,
    files: List[UploadFile] = File(...),
):
    if not files:
        return {"error": "No files provided"}

    merged_pdf  = merger.merge_pdfs(files)
    final_name  = rename_to_original(merged_pdf, "merged.pdf")

    return {
        "message": "Files merged successfully",
        "pdf_file": final_name,
        "pdf_url": str(request.url_for("download_file", filename=final_name)),
        "file_count": len(files),
    }


# ─── PDF Compress ──────────────────────────────────────────────────────────────
@app.post("/compress")
async def compress_endpoint(
    request: Request,
    files: List[UploadFile] = File(...),
    qualityOption: str = Form("medium"),
):
    if not files:
        return {"error": "No files provided"}

    compressed_pdfs = []
    for file in files:
        generated = compressor.compress(file, qualityOption)
        desired   = original_pdf_name(file.filename)
        final     = rename_to_original(generated, desired)
        compressed_pdfs.append(final)

    if len(compressed_pdfs) == 1:
        return {
            "message": "File compressed successfully",
            "pdf_file": compressed_pdfs[0],
            "pdf_url": str(request.url_for("download_file", filename=compressed_pdfs[0])),
            "file_count": 1,
        }

    zip_id       = uuid.uuid4().hex
    zip_filename = f"compressed_{zip_id}.zip"
    pdf_paths    = [os.path.join(file_manager.upload_folder, f) for f in compressed_pdfs]
    file_manager.create_zip(pdf_paths, zip_filename)

    return {
        "message": "Files compressed successfully",
        "zip_file": zip_filename,
        "zip_url": str(request.url_for("download_zip", filename=zip_filename)),
        "file_count": len(compressed_pdfs),
    }


# ─── Image → PDF ───────────────────────────────────────────────────────────────
@app.post("/imageconverter")
async def image_to_pdf_endpoint(
    request: Request,
    files: List[UploadFile] = File(...),
    check_box_value: bool = Form(False),
):
    if not files:
        return {"error": "No files provided"}

    pdf_filenames = []
    for file in files:
        generated = image_converter.convert_image_to_pdf(file)
        desired   = original_pdf_name(file.filename)
        final     = rename_to_original(generated, desired)
        pdf_filenames.append(final)

    if check_box_value and len(pdf_filenames) > 1:
        merged_name = "merged-images.pdf"
        merged_path = os.path.join(file_manager.upload_folder, merged_name)
        merger.merge_pdf_paths(
            [os.path.join(file_manager.upload_folder, f) for f in pdf_filenames],
            merged_path,
        )
        return {
            "message": "Images converted and merged successfully",
            "pdf_file": merged_name,
            "pdf_url": str(request.url_for("download_file", filename=merged_name)),
            "file_count": 1,
        }

    if len(pdf_filenames) == 1:
        return {
            "message": "Image converted successfully",
            "pdf_file": pdf_filenames[0],
            "pdf_url": str(request.url_for("download_file", filename=pdf_filenames[0])),
            "file_count": 1,
        }

    zip_id       = uuid.uuid4().hex
    zip_filename = f"images_converted_{zip_id}.zip"
    pdf_paths    = [os.path.join(file_manager.upload_folder, f) for f in pdf_filenames]
    file_manager.create_zip(pdf_paths, zip_filename)

    return {
        "message": "Images converted successfully",
        "zip_file": zip_filename,
        "zip_url": str(request.url_for("download_zip", filename=zip_filename)),
        "file_count": len(pdf_filenames),
    }


# ─── Protect PDF ───────────────────────────────────────────────────────────────
@app.post("/protect")
async def protect_endpoint(
    request: Request,
    files: List[UploadFile] = File(...),
    password: str = Form(...),
):
    if not files:
        return {"error": "No files provided"}

    protected_pdfs = []
    for file in files:
        generated = protector.protect_pdf(file, password)
        desired   = original_pdf_name(file.filename)
        final     = rename_to_original(generated, desired)
        protected_pdfs.append(final)

    if len(protected_pdfs) == 1:
        return {
            "message": "File protected successfully",
            "pdf_file": protected_pdfs[0],
            "pdf_url": str(request.url_for("download_file", filename=protected_pdfs[0])),
            "file_count": 1,
        }

    zip_id       = uuid.uuid4().hex
    zip_filename = f"protected_{zip_id}.zip"
    pdf_paths    = [os.path.join(file_manager.upload_folder, f) for f in protected_pdfs]
    file_manager.create_zip(pdf_paths, zip_filename)

    return {
        "message": "Files protected successfully",
        "zip_file": zip_filename,
        "zip_url": str(request.url_for("download_zip", filename=zip_filename)),
        "file_count": len(protected_pdfs),
    }


# ─── Split PDF ─────────────────────────────────────────────────────────────────
@app.post("/split")
async def split_endpoint(
    request: Request,
    files: List[UploadFile] = File(...),
    split_checkbox: bool = Form(False),
    mode: str = Form("allPages"),
    page_range: str = Form(""),
):
    if not files:
        return {"error": "No file provided"}

    # Keep a map of original stems per file for naming split pages
    original_stems = {file.filename: os.path.splitext(file.filename)[0] for file in files}

    splited_pdfs = []

    try:
        if mode == "allPages":
            for file in files:
                parts     = spliter.split_pdf(file)
                stem      = original_stems[file.filename]
                renamed   = []
                for i, part in enumerate(parts, start=1):
                    desired = f"{stem}_page{i}.pdf"
                    final   = rename_to_original(part, desired)
                    renamed.append(final)
                splited_pdfs.extend(renamed)

        elif mode == "custom":
            for file in files:
                parts   = spliter.split_pdf_custom_range(file, page_range)
                stem    = original_stems[file.filename]
                renamed = []
                for i, part in enumerate(parts, start=1):
                    desired = f"{stem}_part{i}.pdf"
                    final   = rename_to_original(part, desired)
                    renamed.append(final)
                splited_pdfs.extend(renamed)

            if split_checkbox and len(splited_pdfs) > 1:
                merged_name = "merged-split.pdf"
                merged_path = os.path.join(file_manager.upload_folder, merged_name)
                pdf_paths   = [os.path.join(file_manager.upload_folder, f) for f in splited_pdfs]
                merger.merge_pdf_paths(pdf_paths, merged_path)
                splited_pdfs = [merged_name]

        if len(splited_pdfs) == 1:
            return {
                "message": "File split successfully",
                "pdf_file": splited_pdfs[0],
                "pdf_url": str(request.url_for("download_file", filename=splited_pdfs[0])),
                "file_count": 1,
            }

        zip_id       = uuid.uuid4().hex
        zip_filename = f"split_{zip_id}.zip"
        pdf_paths    = [os.path.join(file_manager.upload_folder, f) for f in splited_pdfs]
        file_manager.create_zip(pdf_paths, zip_filename)

        return {
            "message": "Files split successfully",
            "zip_file": zip_filename,
            "zip_url": str(request.url_for("download_zip", filename=zip_filename)),
            "file_count": len(splited_pdfs),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─── Download endpoints ────────────────────────────────────────────────────────
@app.get("/download/{filename}")
async def download_file(filename: str):
    filename = os.path.basename(filename)
    path = os.path.join(file_manager.upload_folder, filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path, filename=filename)


@app.get("/download_zip/{filename}")
async def download_zip(filename: str):
    filename = os.path.basename(filename)
    path = os.path.join(file_manager.zip_folder, filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Zip not found")
    return FileResponse(path, filename=filename)