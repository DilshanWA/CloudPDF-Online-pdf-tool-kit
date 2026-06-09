'use client';

import React from 'react'
import { ArrowLeft  } from "lucide-react";
import { useRouter } from 'next/navigation';

interface ServererrorProps {
  errorType?: "server" | "System Down" | "normal";
}

export default function Servererror({ errorType }: ServererrorProps) {
  const router = useRouter();

  const goBackHome = () => {
    router.push('/');
  }

  return (
    <div className='fixed inset-0 z-60 flex items-center justify-center bg-gray-100'>
        <div className='flex flex-col justify-center items-center'>
            <div className='w-75 p-4'>
              <img 
                src="/errors/503_server_error.png" 
                alt="503 Server Error"
                className="w-full object-cover rounded-lg"
              />
            </div>
            <h2 className='text-2xl font-semibold text-center md:text-3xl'>Oops! Something went wrong</h2>
            <p className='text-center mt-2 text-gray-600'>Please try again later.</p>
            <button 
            onClick={goBackHome}
            className=" flex gap-3 mt-10 px-4 py-2 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              <ArrowLeft className=" flex inline-block mr-2 self-center items-center justify-center" size={20} /> Back to Home
            </button>
        </div>
    </div>
  )
}
