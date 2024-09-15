import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DropzoneWrapper } from "@/components/wrappers/dropzone-wrapper";
import { GenerateCards } from "./generate-cards";

export default function Page() {
  return (
    <div className="h-full w-full flex justify-center items-center gap-10 flex-col">
      <GenerateCards />
    </div>
  );
}
