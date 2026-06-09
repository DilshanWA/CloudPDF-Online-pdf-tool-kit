import os
import uuid
from PyPDF2 import PdfReader, PdfWriter


class PdfSpliter:
    def __init__(self, file_manager):
        self.file_manager = file_manager

    def split_pdf(self, upload_file) -> list:
        """
        Split every page of a PDF into individual files.
        Returns a list of output filenames (basenames only).
        """
        input_path  = self.file_manager.save_file(upload_file)
        output_files = []
        base_name   = os.path.splitext(os.path.basename(upload_file.filename))[0]

        try:
            reader    = PdfReader(input_path)
            num_pages = len(reader.pages)

            if num_pages == 0:
                raise ValueError("PDF has no pages")

            for page_num in range(num_pages):
                writer = PdfWriter()
                writer.add_page(reader.pages[page_num])

                out_filename = f"{base_name}_{uuid.uuid4().hex}_page_{page_num + 1}.pdf"
                out_path     = os.path.join(self.file_manager.upload_folder, out_filename)

                with open(out_path, "wb") as f:
                    writer.write(f)

                output_files.append(out_filename)

            return output_files

        except Exception:
            raise

        finally:
            # Always remove the original uploaded file
            self.file_manager.remove_file(input_path)

    def split_pdf_custom_range(self, upload_file, page_range: str) -> list:
        """
        Extract specific pages from a PDF.
        page_range format: "1,3,5-8,10"
        Returns a list of output filenames (basenames only).
        """
        input_path   = self.file_manager.save_file(upload_file)
        output_files = []
        base_name    = os.path.splitext(os.path.basename(upload_file.filename))[0]

        try:
            reader    = PdfReader(input_path)
            num_pages = len(reader.pages)

            if num_pages == 0:
                raise ValueError("PDF has no pages")

            pages_to_extract: set[int] = set()
            for segment in page_range.split(","):
                segment = segment.strip()
                if not segment:
                    continue
                if "-" in segment:
                    start, end = segment.split("-", 1)
                    pages_to_extract.update(
                        range(int(start) - 1, min(int(end), num_pages))
                    )
                else:
                    page_num = int(segment) - 1
                    if 0 <= page_num < num_pages:
                        pages_to_extract.add(page_num)

            for page_num in sorted(pages_to_extract):
                writer = PdfWriter()
                writer.add_page(reader.pages[page_num])

                out_filename = f"{base_name}_{uuid.uuid4().hex}_page_{page_num + 1}.pdf"
                out_path     = os.path.join(self.file_manager.upload_folder, out_filename)

                with open(out_path, "wb") as f:
                    writer.write(f)

                output_files.append(out_filename)

            return output_files

        except Exception:
            raise

        finally:
            # BUG FIXED: original had no finally block — input file was never cleaned up
            self.file_manager.remove_file(input_path)
