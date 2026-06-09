import React from 'react'
import FileUpload from '@/components/FileUpload';
import  FileList from '@/components/FileList';
import FileBinder from '@/components/FileBainder';

type FileType = "word_to_pdf" | "merge_pdf" | "compress_pdf" | "image_to_pdf" | "powerpoint_to_pdf" | "protect_pdf" | "excel_to_pdf" | "split_pdf"

const fileTypeConfig =  {
    word_to_pdf: {
        title: "Word to PDF",
        optype: 'convert',
        description: "Easily convert your Word documents to PDF format while preserving formatting.",
        accept: ".doc,.docx",
        SelectType: 'Word',
        extentions: [".doc", ".docx"]
    },
    merge_pdf: {
        title: "Merge PDF",
        optype: 'merge',
        description: "Combine multiple PDF files into a single document quickly and easily.",
        accept: ".pdf",
        SelectType: 'PDF',
        extentions: [".pdf"],
    },
    compress_pdf: {
        title: "Compress PDF",
        optype: 'compress',
        description: "Reduce the file size of your PDFs without compromising quality.",
        accept: ".pdf",
        SelectType: 'PDF',
        extentions: [".pdf"],
    },
    image_to_pdf: {
        title: "Image to PDF",
        optype: 'imageconverter',
        description: "Transform your images into PDF format quickly and conveniently.",
        accept: ".jpg,.jpeg,.png,.bmp,.tiff",
        SelectType: 'Image',
        extentions: [".jpg", ".jpeg", ".png", ".bmp", ".tiff"],
    },
    powerpoint_to_pdf: {
        title: "PowerPoint to PDF",
        optype: 'convert',
        description: "Convert your PowerPoint presentations to PDF format seamlessly.",
        accept: ".ppt,.pptx",
        SelectType: 'PowerPoint',   
        extentions: [".ppt", ".pptx"],
    },
    protect_pdf: {   
        title: "Protect PDF",
        optype: 'protect',
        description: "Easily protect your PDF files with passwords and permissions.",
        accept: ".pdf",
        SelectType: 'PDF',
        extentions: [".pdf"],
    },
    excel_to_pdf: {
        title: "Excel to PDF ",
        optype: 'convert',
        description: "Convert your Excel spreadsheets to PDF format with ease.",
        accept: ".xls,.xlsx",
        SelectType: 'Excel',
        extentions: [".xls", ".xlsx"],
    },
    split_pdf : {
        title: "Split PDF ",
        optype: 'split',
        description: "Easily split your PDF files into smaller, manageable documents.",
        accept: ".pdf",
        SelectType: 'PDF',
        extentions: [".pdf"],
    }
}


export default async function ConverterPage({params}: {params: Promise<{type: string}>}) {
 const resolvedParams = await params
  const type = resolvedParams.type.replace(/-/g, '_') as FileType

  if (!fileTypeConfig[type]) {
    return <div className='flex items-center justify-center'>
      <h1 className='text-2xl font-semibold'>Invalid converter type.</h1>
    </div>
  }
  return (
    <div className='w-full '>
      <div className='max-w-4xl mx-auto'> 
        <main className='container flex flex-col text-black font-regular items-center  px-6 mt-20'> 
          <div className='mx-auto max-w-6xl w-full mb-10'>
            <FileBinder
              extention={fileTypeConfig[type].extentions}
              SelectType={fileTypeConfig[type].SelectType}
              optype={fileTypeConfig[type].optype}
              title={fileTypeConfig[type].title}
              accept={fileTypeConfig[type].accept}
              touch-manipulation = "true"
            />
          </div>
        </main>
    </div>
    </div>
    
  )
}