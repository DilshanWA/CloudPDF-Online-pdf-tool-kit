'use client'
import Link from 'next/link'
import React from 'react'

const ButtonTitle = [
    {
        title: "Word to PDF",
        description: "Convert Word documents to PDF format quickly and easily.",
        link: "/word_to_pdf",
        image: '/Icons/word.png'
    },
    {
        title: "Merge PDF",
        description: "Combine multiple PDF files into a single document effortlessly.",
        link: "/merge_pdf",
        image: "/Icons/merge.png"

    },
    {
        title: "Compress PDF",
        description: "Reduce the file size of your PDFs without compromising quality.",
        link: "/compress_pdf",
        image: "/Icons/compress.png"
    },
    {
        title: "Image to PDF",
        description: "Transform images into PDF format quickly and conveniently.",
        link: "/image_to_pdf",
        image: "/Icons/image_pdf.png"
       
    },
    {
        title : "PowerPoint to PDF",
        description: "Convert PowerPoint presentations to PDF format seamlessly.",
        link: "/powerpoint_to_pdf",
        image: "/Icons/power_point.png"
    },
    {
        title: "Protect PDF",
        description: "Easily protect your PDF files with passwords and permissions.",
        link: "/protect_pdf",
        image: "/Icons/protect.png"
    },
    {
        title: "Excel to PDF",
        description: "Convert Excel spreadsheets to PDF format with ease.",
        link: "/excel_to_pdf",
        image: "/Icons/excel_to_pdf.png"
    },
    {
        title: "Split PDF",
        description: "Easily split your PDF files into smaller, manageable documents.",
        link: "/split_pdf",
        image: "/Icons/split.png"
    }
]

export default function ButtonCard() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl md:px-4 mx-auto top-0'>
        {ButtonTitle.map((buttons, index) => (
        <Link href={buttons.link} key={index} className="block">
            <div className="group h-full rounded-2xl border border-gray-200 bg-white py-8 px-8  hover:border-black/30 cursor-pointer">
            <img src={buttons.image} className="w-[50px] h-[50px] object-cover rounded-lg mb-4"/>
            <h3 className="text-lg font-semibold text-gray-900 mb-2  transition-colors">{buttons.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{buttons.description}</p>
            </div>
        </Link>
        ))}
    </div>
  )
}
