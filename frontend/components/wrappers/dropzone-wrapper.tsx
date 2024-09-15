import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dropzone } from "../ui/dropzone";
import { cn } from "@/lib/utils";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

type DropzoneWrapperProps = {
  className?: string;
  files: string[];
  onFilesChange: Dispatch<SetStateAction<string[]>>;
};

export function DropzoneWrapper({
  className,
  files,
  onFilesChange,
}: DropzoneWrapperProps) {
  return (
    <>
      <Dropzone
        onChange={onFilesChange}
        className={cn("w-full", className)}
        fileExtension="pdf"
      />
      <div className="grid grid-cols-2 gap-2">
        {files.map((file) => (
          <div key={file} className="flex items-center gap-2">
            <span>{file}</span>
            <button
              onClick={() =>
                onFilesChange((prevFiles) =>
                  prevFiles.filter((f) => f !== file)
                )
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
