import React from 'react'
import ButtonCard from '@/components/ButtonCard'

export default function page() {
  return (
    <div className='container max-w-7xl mx-auto'> 
    <div className='p-6 text-3xl font-bold mt-20 mb-6'>
        All Tools
        <p className='font-poppins text-sm font-normal'>Explore all the tools available to enhance your productivity.</p>
    </div>
      <ButtonCard />
    </div>
  )
}
