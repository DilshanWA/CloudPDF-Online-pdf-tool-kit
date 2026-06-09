"use client";

import React, { useCallback,useState} from "react";
import { nanoid } from "nanoid";
import { SlidersHorizontal , Trash2 } from 'lucide-react';
import CardGrid from "./CardGrid";
import { UploadedFiles } from "./FileBainder";
import { Sidebar } from "./SideBar";
import LoadingScreen from "./Loading";
import DownloadResult from "./Download";
import Servererror from "./Servererror";

interface FileListProps {
  files: UploadedFiles[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFiles[]>>;
  operationtype: "convert" | "merge" | "compress" | "split" | "protect" | "imageconverter";
  title: string;
  SelectType: string;
  accept: string;
  onRemove?: (id: string) => void;
}

export default function FileList({files,setFiles,SelectType,accept,onRemove,title,operationtype}: FileListProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadData, setDownloadData] = useState<{url: string;name: string;} | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [splitCheckbox, setSplitCheckbox] = useState(false);
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("allPages");
  const [customRange, setCustomRange] = useState("");
  const [qualityOption, setQualityOption] = useState<"low" | "medium" | "high">("medium");
  const [error , setError] = useState<"server" | "System Down" | false>(false);


  const handleConvertOperation = useCallback( async () => {
    if (!files.length) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("operationType", operationtype);
      formData.append("qualityOption", qualityOption);
      formData.append("password", password);
      formData.append("check_box_value", String(checked));
      formData.append("split_checkbox", String(splitCheckbox));
      formData.append("page_range", customRange);
      formData.append("mode", mode);
      files.forEach((file) => formData.append("files", file.file));
 
      const [response] = await Promise.all([
        fetch("/api/endpoint", {
          method: "POST",
          body: formData,
        }),
      ]);

      if (!response.ok) {
        setError("server");
        return;
      }

      const data = await response.json();

      if (data.files_count === 1 || data.pdfUrl) {
        downloadFile(data.pdfUrl, `${operationtype}.pdf`);
        setDownloadData({ url: data.pdfUrl, name: `${operationtype}.pdf` });
      } else if (data.files_count > 1 && data.zipUrl) {
        downloadFile(data.zipUrl, "files.zip");
        setDownloadData({ url: data.zipUrl, name: "files.zip" });
      }
    } catch (err) {
      setError("System Down");
      console.error("Error during file operation:", err);
    } finally {
      setIsProcessing(false);
    }
  }, [files, operationtype, splitCheckbox, checked,password, mode, customRange,qualityOption]);

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addMoreFiles = (newFileList: FileList) => {
    const newFiles = Array.from(newFileList).map((file: File) => ({
      id: nanoid(),
      file, 
      SelectType,
    }))
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }

  const handleClickUpload = useCallback(()=>{
        fileInputRef.current?.click()
    },[])

  const openMobileSidebar = () => {
    setIsMobileOpen(true);
  }

   const handleCheckboxChange = (value: boolean) => {
    setChecked(value);
  };

  const handleSplitCheckboxChange = (value: boolean) => {
    setSplitCheckbox(value);
  }
      



  return (
    <div className="w-full md:flex relative">
      {/* LEFT */}
      <div className="flex-1 overflow-y-auto  text-white">
        <div className="pr-4 sticky top-20 z-20 w-auto mb-6 flex flex-col items-end gap-3 md:pr-8 pt-4"> 
          <button 
            className="bg-primary text-white text-4xl h-12 w-12 rounded-full shadow-lg hover:bg-primary-dark cursor-pointer transition-colors flex items-center justify-center"
            onClick={handleClickUpload}
          >
            +
          </button>
          
          <div className="pr-3 md:hidden"> {/* Optional padding to center icon under button */}
            <SlidersHorizontal size={30} color="blue" className="cursor-pointer" onClick={openMobileSidebar} />
          </div>
        </div>
        <input 
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={(e) => {
          if(e.target.files){
            addMoreFiles(e.target.files);
          }
        }}
        />
        <CardGrid
          files={files}
          setFiles={setFiles}
          SelectType={SelectType}
          onRemove={onRemove}
          operationtype={operationtype}
        />
        <div className="h-[200px] md:hidden" />
      </div>

      {/* RIGHT PANEL */}
      <div className="fixed bottom-0 left-0 z-50 h-auto w-full md:static md:sticky md:top-0 md:h-screen md:w-[390px]">
        <Sidebar
          files={files}
          operationtype={operationtype}
          title={title}
          accept={accept}
          isProcessing={false}
          onOperationClick={handleConvertOperation}
          onPasswordChange={setPassword}
          qualityOption={qualityOption}
          isMobileOpen={isMobileOpen}
          onModeChange={setMode}
          onCloseMobile={() => setIsMobileOpen(false)} // 
          setQualityOption={setQualityOption}
          onCheckboxChange={handleCheckboxChange}
          onPageRangeChange={setCustomRange}
          onSplitCheckboxChange={handleSplitCheckboxChange}
        />
       {isProcessing && (
         <LoadingScreen   operationtype={operationtype} />
       )}
       {downloadData && ( 
          <DownloadResult fileUrl={downloadData.url} SelectType={SelectType} operationType={operationtype} fileName={downloadData.name}/>
       )}
       {error && (
         <Servererror errorType={error} />
       )}

    </div>
  </div>
  );
}
