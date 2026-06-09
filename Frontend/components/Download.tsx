'use client';
import React, { use, useEffect } from "react";
import { Download, CheckCircle, Plus } from "lucide-react";
import ThankyouCard from "./ui/FeedBack";

interface DownloadResultProps {
  title?: string;
  description?: string;
  fileUrl: string;
  SelectType: string;
  fileName: string;
  operationType: string;
  onClose?: () => void;
}

export default function DownloadResult({
  description = "Click below to download your processed file",
  fileUrl,
  fileName,
  SelectType,
  operationType,
  onClose,
}: DownloadResultProps) {
  const [isgoodtoDownload, setIsgoodtoDownload] = React.useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    setTimeout(() => {
        setIsgoodtoDownload(true);
    },3000)
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isgoodtoDownload) {
      timer = setTimeout(() => {
        setIsgoodtoDownload(false);
      }, 10000); // Close after 10 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  })




  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex justify-center p-6">
      <div className="w-[420px] text-center space-y-6 mt-20">
        <CheckCircle className="mx-auto h-14 w-14 text-primary" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
           {operationType === "convert"
              ? `Your ${SelectType} has been converted !`
              : ""}
            {operationType === "merge"
              ? "Your PDFs have been merged !"
              : ""}
              {operationType === "compress"
              ? "Your PDF has been compressed !"
              : ""}
              {operationType === "split"
              ? " Your PDFs have been split !"
              : ""}
              {operationType === "protect"
              ? " Your PDF has been protected !"
              : ""}
              {operationType === "imageconverter"
              ? `Your ${SelectType} has been converted!`
              : ""}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="w-full flex items-center  cursor-pointer justify-center gap-2 bg-primary hover:bg-primary-dark text-white text- py-5 rounded-lg font-bold transition"
        >
          <Download size={25} />
          Download File
        </button>
        {/* {onClose && (
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-gray-600 transition"
          >
            Close
          </button>
        )}
       */} 
      </div>
       
    </div>
  );
}
