"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropzoneWrapper } from "@/components/wrappers/dropzone-wrapper";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function GenerateCards() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const rounter = useRouter();
  function uploadFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", files![0]);
    fetch("http://127.0.0.1:8000/flashcard-gen", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMsg(data["msg"]);
        rounter.push(
          `/dashboard/flashcards/generate-cards/result?deck=${data["msg"]}`
        );
      });
  }

  return (
    <form
      onSubmit={uploadFile}
      className="h-dvh w-dvw flex justify-center items-center gap-10 flex-col"
    >
      <h1 className="text-2xl font-bold">Generate Your Flashcards</h1>
      <div className="flex gap-5 items-center justify-center h-1/3  w-1/2">
        <Textarea className="h-full" placeholder="Paste your notes here" />
        <div>OR</div>
        <Input
          type="file"
          className="h-full flex-grow flex justify-center items-center"
          onChange={(value) => setFiles(value.target.files)}
        />
      </div>
      <Button disabled={!files || loading} type="submit">
        Generate Flashcards
      </Button>
    </form>
  );
}
