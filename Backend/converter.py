import os
import uuid
import subprocess


class Converter:
    def __init__(self, file_manager):
        self.file_manager = file_manager

    def convert_file(self, upload_file) -> str:
        """
        Convert an Office document (docx, xlsx, pptx, odt …) to PDF
        using LibreOffice headless.

        Returns the output PDF filename (basename only).
        Raises RuntimeError if LibreOffice fails.
        """
        original_name = upload_file.filename
        name, _       = os.path.splitext(os.path.basename(original_name))

        # Save upload with a collision-safe name
        input_path = self.file_manager.save_file(upload_file)

        try:
            command = [
                "soffice",
                "--headless",
                "--convert-to", "pdf",
                input_path,
                "--outdir", self.file_manager.upload_folder,
            ]
            result = subprocess.run(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )

            if result.returncode != 0:
                raise RuntimeError(
                    f"LibreOffice conversion failed for '{original_name}': "
                    f"{result.stderr.decode()}"
                )

            # LibreOffice writes <input_basename_without_ext>.pdf
            input_basename_no_ext = os.path.splitext(os.path.basename(input_path))[0]
            lo_output_path = os.path.join(
                self.file_manager.upload_folder,
                f"{input_basename_no_ext}.pdf",
            )

            # Rename to a human-readable unique filename
            unique_pdf_name = f"{name}_{uuid.uuid4().hex}.pdf"
            unique_pdf_path = os.path.join(
                self.file_manager.upload_folder, unique_pdf_name
            )
            os.rename(lo_output_path, unique_pdf_path)

            return unique_pdf_name

        finally:
            # Always clean up the uploaded source file
            self.file_manager.remove_file(input_path)
