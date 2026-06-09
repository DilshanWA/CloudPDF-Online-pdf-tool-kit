import os
import uuid
from PIL import Image

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".webp"}


class Image_converter:
    A4_WIDTH  = 595
    A4_HEIGHT = 842

    def __init__(self, file_manager):
        self.file_manager = file_manager

    def _image_to_a4_pdf(self, input_path: str, output_pdf_path: str):
        image = Image.open(input_path)

        # Flatten transparency onto white background
        if image.mode in ("RGBA", "LA") or (
            image.mode == "P" and "transparency" in image.info
        ):
            background = Image.new("RGB", image.size, (255, 255, 255))
            background.paste(image, mask=image.split()[-1])
            image = background
        else:
            image = image.convert("RGB")

        image.thumbnail((self.A4_WIDTH, self.A4_HEIGHT), Image.LANCZOS)

        canvas = Image.new("RGB", (self.A4_WIDTH, self.A4_HEIGHT), "white")
        x = (self.A4_WIDTH  - image.width)  // 2
        y = (self.A4_HEIGHT - image.height) // 2
        canvas.paste(image, (x, y))
        canvas.save(output_pdf_path, "PDF")

    def convert_image_to_pdf(self, upload_file) -> str:
        """
        Convert a single image upload to a PDF centred on an A4 canvas.
        Returns the output PDF filename (basename only).
        """
        filename = upload_file.filename
        name, ext = os.path.splitext(os.path.basename(filename))
        ext = ext.lower()

        if ext not in IMAGE_EXTENSIONS:
            raise ValueError(f"Unsupported image format: '{ext}'")

        input_path = self.file_manager.save_file(upload_file)

        try:
            pdf_filename = f"{name}_{uuid.uuid4().hex}_converted.pdf"
            pdf_path     = os.path.join(self.file_manager.upload_folder, pdf_filename)
            self._image_to_a4_pdf(input_path, pdf_path)
            return pdf_filename
        finally:
            self.file_manager.remove_file(input_path)
