import React from "react";
import { Transition } from "@headlessui/react"; // optional for smooth transitions
import { EyeOff } from "lucide-react";

export default function ThankyouCard() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 scale-90"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-90"
    >
      <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center p-4 z-50">
        <div className="flex bg-white rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">We Value Your Feedback!</h2>
          <p className="text-gray-700 mb-6 text-center">
            Thank you for using our PDF services. We would love to hear about your experience and how we can improve.
          </p>
          <div className="gap-4 md:block">
            <form className='mt-6 flex flex-col gap-4'>
              <input type="text" placeholder='Name' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'/>
              <input type="textarea" placeholder='Email' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'/>
              <button type="submit" className='w-full cursor-pointer bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition'>Sign Up</button>
           </form>
          </div>
          <div className="flex-1 bg-green-500 w-full h-full"></div>
        </div>
      </div>
    </Transition>
  );
}
