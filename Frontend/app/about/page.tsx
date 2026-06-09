"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  Twitter,
} from "lucide-react";

export default function About() {
  return (
    <main className="w-full flex items-center text-black justify-center ">
     <section className="mx-auto grid max-w-7xl items-center mt-15 sm:mt-10 gap-12  py-20 sm:px-10 lg:grid-cols-2 ">
        
        {/* LEFT */}
        <div className="p-6">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Hi, I’m <span className="text-blue-600">Dilshan</span>
          </h1>

          <p className="mb-6 text-xl font-semibold text-blue-600">
            Software Engineer
          </p>

          <div className="space-y-3 text-lg leading-8 text-gray-700 text-justify">
            <p>
              I built this project in 2025 with a clear goal — to make working with PDF
              files simple, fast, and accessible for everyone.
            </p>

            <p>
              CloudPDF focuses on delivering a clean and reliable experience without
              unnecessary complexity, making document conversion effortless.
            </p>

            <p>
              The platform is free to use, and I continuously improve it with better
              performance, new features, and a user-first approach.
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="mt-8 flex items-center gap-5">
            
            <Link href="https://github.com/yourusername" target="_blank">
              <Github className="text-gray-600 hover:text-blue-600 transition" size={22} />
            </Link>

            <Link href="https://linkedin.com/in/yourusername" target="_blank">
              <Linkedin className="text-gray-600 hover:text-blue-600 transition" size={22} />
            </Link>

            <Link href="https://twitter.com/yourusername" target="_blank">
              <Twitter className="text-gray-600 hover:text-blue-600 transition" size={22} />
            </Link>

            <Link href="https://dilshanthathsara.me" target="_blank">
              <Globe className="text-gray-600 hover:text-blue-600 transition" size={22} />
            </Link>

            <Link href="mailto:youremail@example.com">
              <Mail className="text-gray-600 hover:text-blue-600 transition" size={22} />
            </Link>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative h-[420px] w-full max-w-sm overflow-hidden rounded-3xl bg-blue-100 shadow-lg">
            <Image
              src="/dilshan-developer.png"
              alt="Dilshan"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </section>
    </main>
  );
}