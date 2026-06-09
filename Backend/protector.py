import os
import uuid
from PyPDF2 import PdfReader, PdfWriter


class Protector:
    def __init__(self, file_manager):
        self.file_manager = file_manager

    def protect_pdf(self, upload_file, password: str) -> str:
        """
        Password-protect a PDF and return the output filename (basename only).

        BUG FIXED: the original code named the first parameter 'file_manager',
        which shadowed self.file_manager and made the code work only by accident.
        """
        input_path = self.file_manager.save_file(upload_file)

        original_name = os.path.splitext(os.path.basename(upload_file.filename))[0]
        output_filename = f"{original_name}_{uuid.uuid4().hex}_protected.pdf"
        output_path     = os.path.join(self.file_manager.upload_folder, output_filename)

        try:
            reader = PdfReader(input_path)
            writer = PdfWriter()

            for page in reader.pages:
                writer.add_page(page)

            writer.encrypt(password)

            with open(output_path, "wb") as f:
                writer.write(f)

            return output_filename

        except Exception:
            raise

        finally:
            self.file_manager.remove_file(input_path)
