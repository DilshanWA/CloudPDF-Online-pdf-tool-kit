'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { Eye, EyeOff  } from 'lucide-react';
import axios from 'axios';
import { METHODS } from 'http';
import Loading from '@/components/Loading';

export default function SignupPage() {
  const router = useRouter();
  const [isShowpassword, setVisiblePassword] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isToggleVisible, setIsToggleVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

   const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include" 
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      console.log(data);
      setIsLoading(false);
      router.push("/");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className='bg-white w-[500px] h-auto text-center px-5 rounded-lg text-black'>
      <img src="/Logo/logo.png" alt="CloudPDF Logo" className='w-23 h-15 mx-auto mb-5' />
        <h1 className='text-2xl font-bold text-center text-black sm:text-3xl'>Create Your Account</h1>
        <p>Please fill in your details to create an account.</p>
        <form className='mt-6 flex flex-col gap-4 text-black' onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder='Name' 
              value={name}
              onChange= {(e)=> setName(e.target.value)}
              className='w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'/>
            <input 
              type="email" 
              placeholder='Email' 
              value={email}
              onChange= {(e)=> setEmail(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'/>
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
                        <Eye />
                      ) : (
                        <EyeOff />
                      )}
                    </span>
                  )}
                </div>
            <button type="submit" className='w-full cursor-pointer bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition'>Sign Up</button>
        </form>
        <p className='mt-4'>Have an account? <a href="/login" className='text-primary font-bold'>Login</a></p>
        {isLoading && <Loading operationtype="Signup" subtitle="Creating your account..." />}
    </div>
  );
}
