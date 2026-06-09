'use client';
import React from 'react'
import { MailCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';

export default function ThankYouPage() {
  const router = useRouter();

  const BackToHome = () => {
    router.push("/");
  }
  return (
    <div className='flex items-center bg-white text-black '>
      <div className='mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 mt-25'>
        <div className='text-center'>
          <MailCheck className='mx-auto h-25 w-25 text-primary' />
          <h1 className='mt-10 text-4xl font-bold text-gray-900'>Thank You for Your Feedback!</h1>
          <p className='mt-5 text-gray-600'>
            We appreciate your input and will review it as soon as possible.
          </p>
          <div className='flex flex-row items-center justify-center mt-10'>
            <MoveLeft className='mr-2 text-gray-500' />
            <button 
            onClick={BackToHome}
            className='text-gray-500  rounded-full font-normal  cursor-pointer transition-colors duration-200'
            >
            Back to Home
            </button>
          </div> 
        </div>
      </div>
    </div>
  )
}
