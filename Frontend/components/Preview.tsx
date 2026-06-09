'use client';

import React, { useEffect, useState } from "react";

interface PreviewProps {
  selectedFileType: string;
  file: File | null;
}

export default function Preview({ selectedFileType, file }: PreviewProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFileType === "Image" && file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null);
    }
  }, [selectedFileType, file]);

  return (
    <div className="w-[180px] h-[160px] flex items-center justify-center">
      {/* IMAGE PREVIEW */}
      {selectedFileType === "Image" && imageSrc && (
        <img
          src={imageSrc}
          alt="Preview"
          className="
            w-auto
            w-auto
            object-contain
            rounded-sm
          "
        />
      )}

      {/* PDF ICON */}
      {selectedFileType === "PDF" && (
        <img
          src="/Icons/pdf.png"
          alt="PDF Icon"
          className="w-20 h-20 object-contain"
        />
      )}

      {/* WORD ICON */}
      {selectedFileType === "Word" && (
        <img
          src="/Icons/word.png"
          alt="Word Icon"
          className="w-12 h-12 object-contain"
        />
      )}
      {/* EXCEL ICON */}
      {selectedFileType === "Excel" && (
        <img
          src="/Icons/excel.png"
          alt="Excel Icon"
          className="w-12 h-12 object-contain"
        />
      )}
      {/* POWERPOINT ICON */}
      {selectedFileType === "PowerPoint" && (
        <img
          src="/Icons/powerpoint.png"
          alt="PowerPoint Icon"
          className="w-12 h-12 object-contain"
        />
      )}
    </div>
  );
}
