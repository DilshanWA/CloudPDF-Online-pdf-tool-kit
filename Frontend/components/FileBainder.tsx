'use client'
import React,{useState,useRef, useCallback} from 'react'
import { nanoid } from 'nanoid';
import FileUpload from './FileUpload';
import FileList from './FileList';
import { title } from 'process';

export interface UploadedFiles {
    id: string;
    file: File;
    SelectType: string;
    pdfUrl?: string;
    zipUrl?: string;
    errMessage?: string;
}


interface FileBainderProps {
    extention: string[];
    accept: string;
    optype: string;
    SelectType: string;
    title: string;
}


export default function FileBainder({
  extention,
  accept,
  SelectType,
  optype,
  title
}: FileBainderProps) {
  const [files, setFiles] = useState<UploadedFiles[]>([])


    const handleFilesAdded = useCallback((newFiles: File[]) => {
      const uploaded = newFiles.map(file => ({
        id: nanoid(),
        file,
        SelectType,
        status: 'Ready' as const,
      }))
      setFiles(uploaded) // 
    }, [SelectType])


    const handleRemoveFile = useCallback((id: string) => {
      setFiles(prev => prev.filter(f => f.id !== id))
    }, [])
    
    if (files.length > 0) {
      return (
        <div className="fixed mx-auto w-full inset-0 bg-gray-100">
          <FileList
            files={files}
            accept={accept}
            setFiles={setFiles}
            onRemove={handleRemoveFile}
            SelectType={SelectType}
            operationtype={optype as "convert" | "merge" | "compress" | "split" | "protect"}
            title={title}
          />
        </div>
      )
    }

    return (
      <FileUpload
        onFileAdded={handleFilesAdded}
        accept={accept}
        title={SelectType + " File Upload"}
        discription={"Upload your " + SelectType + " files to proceed with the " + optype + " operation."}
        SelectType={SelectType}
        extention={extention}
      />
    )
}
