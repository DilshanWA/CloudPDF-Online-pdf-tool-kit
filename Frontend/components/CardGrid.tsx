'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { UploadedFiles } from './FileBainder';

interface CardGridProps {
  files: UploadedFiles[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFiles[]>>;
  SelectType: string;
  operationtype:
    | 'convert'
    | 'merge'
    | 'compress'
    | 'split'
    | 'protect'
    | 'imageconverter';
  onRemove?: (id: string) => void;
}

export default function CardGrid({
  files,
  setFiles,
  SelectType,
  onRemove,
  operationtype,
}: CardGridProps) {
  const isMerge = operationtype === 'merge';

  // ✅ Detect touch devices safely
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // ✅ Adaptive sensors
  const sensors = useSensors(
    isTouchDevice
      ? useSensor(TouchSensor, {
          activationConstraint: {
            delay: 200,
            tolerance: 6,
          },
        })
      : useSensor(PointerSensor, {
          activationConstraint: {
            distance: 5,
          },
        })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        if (!isMerge) return;

        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setFiles((prev) => {
          const oldIndex = prev.findIndex((f) => f.id === active.id);
          const newIndex = prev.findIndex((f) => f.id === over.id);
          return arrayMove(prev, oldIndex, newIndex);
        });
      }}
    >
      <SortableContext
        items={files.map((f) => f.id)}
        strategy={rectSortingStrategy}
      >
        {/* ✅ Fully responsive grid */}
    <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-5 sm:px-4 md:px-6 lg:px-8
          py-4
          grid
          p-5
          justify-items-cente
          gap-y-3 sm:gap-y-4
          gap-x-2 sm:gap-x-3 lg:gap-x-4 xl:gap-x-4
        "
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 200px))',
          justifyContent: 'center',
        }}
      >
 

          {files.map((file) => (
            <SortableItem
              key={file.id}
              id={file.id}
              file={file}
              SelectType={SelectType}
              operationtype={operationtype}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
