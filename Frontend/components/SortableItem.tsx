'use client';

import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Preview from './Preview';
import { UploadedFiles } from './FileBainder';
import { X } from 'lucide-react';

interface Props {
  id: string;
  file: UploadedFiles;
  operationtype:
    | 'convert'
    | 'merge'
    | 'compress'
    | 'split'
    | 'protect'
    | 'imageconverter';
  SelectType: string;
  onRemove?: (id: string) => void;
}

export default function SortableItem({
  id,
  file,
  operationtype,
  SelectType,
  onRemove,
}: Props) {
  const isMerge = operationtype === 'merge';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    disabled: !isMerge,
  });

  return (
    <div
        ref={setNodeRef}
        {...attributes}
        {...(isMerge ? listeners : {})}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className={`
          relative
          w-[180px] h-[230px]
          rounded-xl p-3
          bg-white text-black shadow-lg
          flex flex-col items-center justify-between
          ${isMerge ? 'cursor-grab active:cursor-grabbing' : ''}
          touch-manipulation
        `}
      >

      {/* 🔒 Fixed Preview Area */}
      <div className="w-full h-[130px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <Preview selectedFileType={SelectType} file={file.file} />
      </div>

      {/* File name */}
      <p className="text-xs font-medium truncate w-full text-center mt-2">
        {file.file.name}
      </p>

      {/* Hint */}
      <p className="text-[10px] text-gray-400">
        {isMerge ? 'Long press to reorder' : 'Reorder disabled'}
      </p>

      {onRemove && (
        <button
          onClick={() => onRemove(file.id)}
          aria-label="Remove file"
          className="
            absolute -top-2 -right-1
            rounded-full p-1
            bg-gray-200
            text-white hover:text-black
            hover:bg-red-400
            cursor-pointer
            transition-colors
            z-20
          "
        >
         <X size={14} />
        </button>
      )}

    </div>
  );
}
