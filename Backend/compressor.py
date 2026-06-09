import os
import subprocess


class Compressor:
    GS_QUALITY_MAP = {
        "low":    "/screen",
        "medium": "/ebook",
        "high":   "/prepress",
    }

    def __init__(self, file_manager):
        self.file_manager = file_manager

    def _gs_compress(self, input_path: str, output_path: str, quality: str, file_size_bytes: int):
        gs_setting = self.GS_QUALITY_MAP.get(quality, "/ebook")

        # If a "high" quality PDF is already large, fall back to screen quality
        # to actually achieve size reduction.
        if quality == "high" and file_size_bytes > 1 * 1024 * 1024:
            gs_setting = "/screen"

        subprocess.run(
            [
                "gs",
                "-sDEVICE=pdfwrite",
                "-dCompatibilityLevel=1.4",
                f"-dPDFSETTINGS={gs_setting}",
                "-dNOPAUSE",
                "-dQUIET",
                "-dBATCH",
                f"-sOutputFile={output_path}",
                input_path,
            ],
            check=True,
        )

    def compress(self, upload_file, quality: str = "medium") -> str:
        """
        Compress a PDF and return the output filename (basename only).
        """
        name, _ = os.path.splitext(os.path.basename(upload_file.filename))

        input_path      = self.file_manager.save_file(upload_file)
        output_filename = f"{name}_compressed.pdf"
        output_path     = os.path.join(self.file_manager.upload_folder, output_filename)

        try:
            file_size_bytes = os.path.getsize(input_path)
            self._gs_compress(input_path, output_path, quality, file_size_bytes)
            return output_filename
        finally:
            self.file_manager.remove_file(input_path)
