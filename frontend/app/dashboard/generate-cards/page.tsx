import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DropzoneWrapper } from "@/components/wrappers/dropzone-wrapper";

export default function Page() {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center gap-10 flex-col">
      <h1 className="text-2xl font-bold">Generate Your Flashcards</h1>
      <div className="flex gap-5 items-center justify-center h-1/3  w-1/2">
        <Textarea className="h-full" placeholder="Paste your notes here" />
        <div>OR</div>
        <DropzoneWrapper className="w-full h-full flex items-center justify-center" />
      </div>
      <Button>Generate Flashcards</Button>
    </div>
  );
}
