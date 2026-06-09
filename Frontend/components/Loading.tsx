'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  subtitle?: string;
  className?: string;
  operationtype?: "convert" | "merge" | "compress" | "split" | "protect" | "imageconverter" | 'Login' | 'Signup';
}

const operationMessages: Record<NonNullable<LoadingScreenProps["operationtype"]>, string> = {
  convert: "Converting files",
  merge: "Merging files",
  compress: "Compressing files",
  split: "Splitting files",
  protect: "Protecting files",
  imageconverter: "Converting files",
  Login: "Logging in",
  Signup: "Creating account",
};

export default function LoadingScreen({
  operationtype,
  subtitle = "Please wait to complete your request",
  className = '',
  ...rest
}: LoadingScreenProps) {

  const [step, setStep] = useState<"uploading" | "processing">("uploading");

  useEffect(() => {
    // Change message after 2 seconds (adjust as needed)
    const timer = setTimeout(() => {
      setStep("processing");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getMessage = () => {
    if (step === "uploading") return "Uploading files";
    return operationtype ? operationMessages[operationtype] : "Processing";
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-white bg-opacity-75 backdrop-blur-sm" {...rest}>
      <div className="flex flex-col items-center mt-30 gap-4 rounded-lg bg-white p-6">
        <Image src="/Logo/logo_loading.png" alt="Loading" width={150} height={60}  className="mb-12"/>
        <div className="h-15 w-15 rounded-full border-6 border-gray-200 border-t-primary animate-spin" />

        <div className="text-center mt-4">
          <h2 className="text-4xl font-semibold text-gray-900">
            {operationtype ? operationMessages[operationtype] : "Processing"}
          </h2>
          <p className="text-md text-gray-500 mt-4">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}