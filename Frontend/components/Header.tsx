'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white backdrop-blur supports-[backdrop-filter]:bg-white/100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Logo/cloudpdflogo.png"
                alt="CloudPDF Logo"
                width={35}
                height={32}
              />
              <span className="text-2xl font-bold text-gray-800">Cloud<span className="text-blue-600">PDF</span></span>
            </Link>

            <div className="hidden md:flex ml-20 items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600  font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600  font-medium transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="/feedback"
              className="text-gray-700 hover:text-blue-600  font-medium transition-colors duration-200"
            >
              Feedback
            </Link>
          </div>
        </div>
        <button className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden space-y-2 animate-in fade-in slide-in-from-top-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 absolute right-4 top-16 w-48 p-4">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/feedback"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Feedback
            </Link>
            <button className="w-full px-4 py-2 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
              Get Started
            </button>
          </div>
        )}

        </div>
      </div>
    </header>
  );
}