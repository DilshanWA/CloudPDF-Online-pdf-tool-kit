'use client'
import React from 'react'
import { Eye, EyeOff  } from 'lucide-react';

export default function page() {
  const [isShowpassword, setVisiblePassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [isToggleVisible, setIsToggleVisible] = React.useState(false);

   const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
   }

  return (
    <div className='bg-white w-[500px] h-auto text-center px-5 rounded-lg top-0'> 
        <img src="/Logo/logo.png" alt="CloudPDF Logo" className='w-23 h-15 mx-auto mb-10' />
        <h2 className='text-3xl font-bold text-center'>Welcome Back !</h2>
        <p className='mb-4'>Please login with your personal info to continue.</p>
        <form className='mt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'/>
            <div className='relative'>
              <input 
                type= {isShowpassword ? 'password' : 'text'}
                placeholder='Password' 
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  if (value.length > 0) {
                    setIsToggleVisible(true);
                  }
                  else{
                    setIsToggleVisible(false);
                    setVisiblePassword(false);
                  }

                }}
                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              />
              {isToggleVisible && (
                <span
                  className="absolute right-5 top-[12px] cursor-pointer"
                  onClick={() => setVisiblePassword(!isShowpassword)}
                >
                  {isShowpassword ? (
                    <Eye className='text-primary'/>
                  ) : (
                    <EyeOff className='text-primary'/>
                  )}
                </span>
              )}
            </div>
  
            <p className='text-left'><a href="/forgot-password" className='text-black text-sm'>Forgot Password?</a></p>
            <button type="submit" className='w-full cursor-pointer bg-primary text-white py-3 rounded-md hover:bg-primary-dark cursor-pointer transition'>Login</button>
        </form>
        <p className='mt-4'>Don't have an account? <a href="/signup" className='text-primary font-bold'>Sign Up</a></p>

    </div>
  )
}
