import os
import shutil
import uuid
import zipfile


class FileManager:
    def __init__(self, upload_folder="/tmp/uploads", zip_folder="/tmp/zips"):
        self.upload_folder = upload_folder
        self.zip_folder    = zip_folder
        os.makedirs(self.upload_folder, exist_ok=True)
        os.makedirs(self.zip_folder,    exist_ok=True)

    def save_file(self, file) -> str:
        """
        Save an uploaded file to disk.
        A UUID prefix is added to avoid collisions when multiple users
        upload files with the same name simultaneously.
        """
        original_name = getattr(file, "filename", None) or "upload"
        safe_name     = f"{uuid.uuid4().hex}_{os.path.basename(original_name)}"
        filepath      = os.path.join(self.upload_folder, safe_name)

        if hasattr(file, "file"):          # FastAPI UploadFile
            with open(filepath, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        else:                              # Flask FileStorage (backward compat)
            file.save(filepath)

        return filepath

    def remove_file(self, filepath: str) -> None:
        if filepath and os.path.exists(filepath):
            os.remove(filepath)

    def create_zip(self, files: list, zip_name: str) -> str:
        zip_path = os.path.join(self.zip_folder, zip_name)
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for file in files:
                if os.path.exists(file):
                    zipf.write(file, arcname=os.path.basename(file))
                    self.remove_file(file)
        return zip_path
