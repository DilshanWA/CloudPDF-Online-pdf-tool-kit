'use client';

import React, { useState } from "react";
import { UploadedFiles } from "./FileBainder";
import { PanelRightClose  } from 'lucide-react';

interface OperationDetails {
  description: string;
  buttonLabel: string;
}

export const operationDetails: Record<
  "convert" | "merge" | "compress" | "split" | "protect" | "imageconverter",
  OperationDetails
> = {
  convert: {
    description:
      "Convert your files quickly and easily. Supported formats include PDF, Word, Excel, and more.",
    buttonLabel: "Convert PDF",
  },
  merge: {
    description: "Drag to change file order before merging PDFs into one document.",
    buttonLabel: "Merge PDF",
  },
  compress: {
    description:
      "Compress your PDF files to reduce their size without compromising quality.",
    buttonLabel: "Compress PDF",
  },
  split: {
    description: "Choose to split every page or specify custom page ranges to extract from your PDF.",
    buttonLabel: "Split PDF",
  },
  protect: {
    description: "Secure your PDF files by adding password protection to prevent unauthorized access.",
    buttonLabel: "Protect PDF",
  },
  imageconverter: {
    description: "If you need a single PDF just click the checkbox below",
    buttonLabel: "Convert to PDF",
  },
};

interface OperationPanelProps {
  files: UploadedFiles[];
  operationtype: "convert" | "merge" | "compress" | "split" | "protect" | "imageconverter";
  password?: string;
  title: string;
  onPasswordChange: (password: string) => void;
  accept: string;
  isProcessing: boolean;
  onOperationClick: () => void;
  qualityOption: "low" | "medium" | "high";
  setQualityOption: (v: "low" | "medium" | "high") => void;
  onCheckboxChange: (checked: boolean) => void;
  SelectType?: string;
  onModeChange?: (mode: string) => void;
  onSplitCheckboxChange?: (checked: boolean) => void;
  onPageRangeChange?: (range: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  files,
  operationtype,
  title,
  isProcessing,
  onOperationClick,
  accept,
  isMobileOpen,
  onCloseMobile,
  onModeChange,
  onPageRangeChange,
  qualityOption,
  onPasswordChange,
  setQualityOption,
  onCheckboxChange,
  onSplitCheckboxChange,
  SelectType,
}: OperationPanelProps) {
  const [isShowToggleIcon, setShowToggleIcon] = useState(false);
  const [isShowpassword, setIsShowpassword] = useState(false);
  const [password, setPassword] = useState("");
  const [checkedImageMerger, setCheckedImageMerger] = useState(false);
  const [splitCheckbox, setSplitCheckbox] = useState(false);
  const [mode, setMode] = useState<"custom" | "allPages">("allPages");
  const [customRange, setCustomRange] = useState("");




  // Determine if button should be disabled
  const isButtonDisabled = () => {
    if (isProcessing) return true;

    if (operationtype === "merge" && (files?.length ?? 0) <= 1) return true;

    if (operationtype === "split") {
      if ((files?.length ?? 0) < 1) return true;
      if (mode === "custom" && customRange.trim() === "") return true;
    }

    // If you want convert button disabled without password (if needed), add here:
    // if (operationtype === "convert" && password.trim() === "") return true;

    return false;
  };

  return (
     <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-white shadow-lg flex flex-col md:p-1
          md:static md:w-full md:h-full md:block
          fixed top-0 right-0 h-full w-[85%] max-w-full z-50
          transform transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0
        `}
      >

    
      
      <h2 className="mt-25 text-3xl text-center font-bold md:mt-20  mx-auto">{title}</h2>
      <hr className="my-6 border-border opacity-15 w-full" />
    

    <div className="p-6">
      <p className="mb-10 bg-primary/30 p-5 rounded text-gray-700 font-regular text-sm">
        {operationDetails[operationtype].description}
      </p>

      {/* Checkbox for image converter */}
      {operationtype === "imageconverter" && (
        <div className="mb-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={checkedImageMerger}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setCheckedImageMerger(isChecked);
                onCheckboxChange(isChecked);
              }}
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <span className="text-gray-700 font-medium text-md">
              Merge all images
            </span>
          </label>
        </div>
      )}

      {/* Password input for protect operation */}
      {operationtype === "protect" && (
        <div className="mb-6 relative">
          <input
            type={isShowpassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              onPasswordChange(value);

              setShowToggleIcon(value.length > 0);
              if (value.length === 0) setIsShowpassword(false);
            }}
            className="border w-full mt-3 border-gray-300 rounded py-3 px-3 pr-16"
            placeholder="Enter password to protect PDF"
            required
          />

          {isShowToggleIcon && (
            <span
              className="absolute right-4 top-[30px] text-sm cursor-pointer text-red-600 select-none"
              onClick={() => setIsShowpassword(!isShowpassword)}
            >
              {isShowpassword ? "Hide" : "Show"}
            </span>

          )}
        </div>
      )}

      {/* Compression Level for compress operation */}
      {operationtype === "compress" ? (
        <div className="mb-6">
          <label htmlFor="compressionLevel" className="block font-medium mb-1">
            Compression Level:
          </label>
          <select
            id="compressionLevel"
            value={qualityOption}
            onChange={(e) =>
              setQualityOption(e.target.value as "low" | "medium" | "high")
            }
            className="border z-50 w-full mt-3 border-gray-300 rounded py-3 px-3"
          >
            <option value="low">Low (smaller size, lower quality)</option>
            <option value="medium">Medium (Recommended)</option>
            <option value="high">High (better quality, larger size)</option>
          </select>
        </div>
      ) : 
      operationtype === "split" && files.length > 0 ? (
        <>
          <div className="mb-6">
            <div>
             <div className="mb-6 flex gap-2 w-full">
              <button
                type="button"
                onClick={() => {
                  setMode("allPages");
                  onModeChange?.("allPages");
                }}
                className={`py-3 px-4 rounded border w-full ${
                  mode === "allPages" ? "bg-transparent border-red-600 text-red-600" : "bg-white text-gray-700"
                }`}
              >
                Extract all Pages
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("custom");
                  onModeChange?.("custom");
                }}
                className={`py-3 px-4 rounded border w-full ${
                  mode === "custom" ? "bg-transparent border-red-600 text-red-600" : "bg-white text-gray-700"
                }`}
              >
                Custome Pages
              </button>
            </div>
              {mode === "custom" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="e.g., 1-3,5,7-9"
                    value={customRange}
                    onChange={(e) => {
                      setCustomRange(e.target.value);
                      onPageRangeChange?.(e.target.value);
                    }}
                    className="border w-full border-gray-300 rounded py-2 px-3"
                    required={mode === "custom"}
                  />
                  <label htmlFor="" className="mb-4 flex items-center gap-2 text-sm font-medium mt-3 text-gray-600">
                    <input 
                    type="checkbox"
                    id="Merge_custom_split_pdf"
                    checked={splitCheckbox}
                    onChange = {(e) =>{
                      const checkedValue = e.target.checked;
                      setSplitCheckbox(checkedValue);
                      onSplitCheckboxChange?.(checkedValue);
                    }}
                     />
                     Marge Custome Pages into a single PDF
                  </label>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        null
      )}

      <button
        type="button"
        onClick=
         {operationtype === "protect" && password.trim() === "" ? () => alert("Please enter a password.") : onOperationClick}
        disabled={isButtonDisabled()}
        className={`w-full  py-4 rounded font-semibold cursor-pointer text-white transition-colors focus:outline-none ${
          isButtonDisabled()
            ? "bg-primary cursor-not-allowed"
            : "bg-primary hover:bg-primary-dark"
        }`}
        aria-busy={isProcessing}
      >
        {isProcessing
          ? `${operationDetails[operationtype].buttonLabel}...`
          : operationDetails[operationtype].buttonLabel}
      </button>
    </div>
  </div>

    {/* Mobile Bottom Bar */}
    {!isMobileOpen && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white p-4  flex justify-center items-center back">
        <button
          type="button"
          onClick=
          {operationtype === "protect" && password.trim() === "" ? () => alert("Please enter a password.") : onOperationClick}
          disabled={isButtonDisabled()}
          className={`w-full mt-6 py-4 rounded font-semibold cursor-pointer text-white transition-colors focus:outline-none ${
            isButtonDisabled()
              ? "bg-red-300 cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark"
          }`}
          aria-busy={isProcessing}
        >
          {isProcessing
            ? `${operationDetails[operationtype].buttonLabel}...`
            : operationDetails[operationtype].buttonLabel}
        </button>
      
      </div>
    )}
    </>
        
  );
}
