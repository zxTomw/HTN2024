"use client";
import { useState } from "react";
import { Dropzone } from "../ui/dropzone";
import { cn } from "@/lib/utils";

type DropzoneWrapperProps = {
  className?: string;
};

export function DropzoneWrapper({ className }: DropzoneWrapperProps) {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <>
      <Dropzone
        onChange={setFiles}
        className={cn("w-full", className)}
        fileExtension="pdf"
      />
      <div className="grid grid-cols-2 gap-2">
        {files.map((file) => (
          <div key={file} className="flex items-center gap-2">
            <span>{file}</span>
            <button
              onClick={() =>
                setFiles((prevFiles) => prevFiles.filter((f) => f !== file))
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}