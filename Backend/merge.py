import os
import uuid
from PyPDF2 import PdfMerger


class Merger:
    def __init__(self, file_manager):
        self.file_manager = file_manager

    def merge_pdfs(self, upload_files) -> str:
        """
        Accept a list of UploadFile objects, merge them, and return
        the merged PDF filename (basename only).
        """
        merger      = PdfMerger()
        saved_paths = []

        try:
            for file in upload_files:
                path = self.file_manager.save_file(file)
                saved_paths.append(path)
                merger.append(path)

            merged_filename = f"cloudpdf-merged-{uuid.uuid4().hex}.pdf"
            merged_path     = os.path.join(self.file_manager.upload_folder, merged_filename)
            merger.write(merged_path)
            return merged_filename

        except Exception:
            raise

        finally:
            merger.close()
            for path in saved_paths:
                self.file_manager.remove_file(path)

    def merge_pdf_paths(self, pdf_paths: list, output_path: str) -> str:
        """
        Merge a list of on-disk PDF paths into output_path.
        Returns output_path.
        """
        merger = PdfMerger()
        try:
            for path in pdf_paths:
                merger.append(path)
            merger.write(output_path)
            return output_path
        except Exception:
            raise
        finally:
            merger.close()
