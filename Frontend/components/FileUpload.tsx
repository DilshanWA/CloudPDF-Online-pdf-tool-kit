'use client'

import { Upload } from 'lucide-react';
import React,{ useState, useCallback} from 'react'

interface FileUploadProps {
    onFileAdded: (files : File []) => void;
    accept: string;
    title: string;
    discription: string;
    SelectType: string;
    extention: string[];
    disabled?: boolean;
}

export default function FileUpload(props: FileUploadProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const isValidFileType = useCallback((file: File) =>{
        const fileExtract = '.' +file.name.split('.').pop();
        return props.extention.includes(fileExtract);
    },[])

    const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
        e.stopPropagation();
        if(e.type === "dragenter" || e.type === "dragover"){
            setIsDragging(true);
        }
        else if(e.type === "dragleave"){
            setIsDragging(false);
        }
    },[]);

    const handleDropEvent = useCallback((e: React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files || []);
        const validFiles = files.filter(isValidFileType);
        if( validFiles && validFiles.length > 0){
          props.onFileAdded(validFiles);
          e.dataTransfer.clearData();
        }else{
          setErrorMessage(`Invalid file Type. Please Upload ${props.extention.join(', ')} files only.`);
        }
    },[props.onFileAdded, props.disabled]);

    

    const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        if(props.disabled) return;
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(isValidFileType);
        if( validFiles && validFiles.length > 0){
          props.onFileAdded(validFiles);
          e.target.value = '';
        }else{
          setErrorMessage(`Invalid file Type. Please Upload ${props.extention.join(', ')} files only.`);
        }
    },[]);

    const handleClickUpload = useCallback(()=>{
        fileInputRef.current?.click()
    },[])



  return (
    <>
    <div className='mb-8 text-center'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4'>{props.title}</h1>
        <p className='text-gray-600 text-lg md:text-xl'>{props.discription}</p>
      </div>
     <div
        onDragEnter = {handleDragEvents}
        onDragOver = {handleDragEvents}
        onDragLeave = {handleDragEvents}
        onDrop={handleDropEvent}
      className={`hidden md:block border-2 border-dashed rounded-lg p-20 text-center cursor-pointer 
      ${isDragging ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}>

        <label
        htmlFor='file-upload'
        className={"flex flex-col items-center justify-center cursor-pointer " + (props.disabled ? "pointer-events-none opacity-50" : ""
       )}>
        <div className='justify-center items-center flex flex-col'>
        <Upload className='w-10 h-10 mb-5 text-gray-400' />
        <div className='text-lg font-bold text-black-500 mb-2'>
          {props.disabled ? 'File upload disabled' : 'Drop files here or click to upload'}  
        </div>
        <div>
          <p
           className='text-sm text-gray-500'
          >{`Supported File Types: ${props.extention.map(ext => ext.replace('.', '').toUpperCase()).join(', ')}`}</p>
        </div>
        <input
          ref={fileInputRef}
          id='file-upload'
          type='file'
          multiple
          accept={props.accept}
          className='hidden'
          onChange={handleFileUpload}
          disabled={props.disabled}
        />
        <button
         className='px-4 py-2 mt-4 bg-primary rounded-lg cursor-pointer text-white font-bold rounded hover:bg-primary-dark disabled:opacity-50'
         onClick={handleClickUpload}
         >
          Select {props.SelectType}
        </button>
        {errorMessage && 
          <div className='mt-4 text-red-500 text-sm'>
            {errorMessage}  
        </div>
        }
        </div>
       </label>
    </div>
    <div className='w-full bg-green-500 rounded-lg max-w-md mx-auto md:hidden  left-0 right-0'>
      <button className='w-full h-[70px] bg-primary rounded-lg cursor-pointer text-xl text-white font-bold rounded hover:bg-primary-dark disabled:opacity-50'
       onClick={handleClickUpload}>
        Upload Files
      </button>
    </div>
    </>
  )
}
