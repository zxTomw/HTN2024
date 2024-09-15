import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SetUsername } from "./set-username";

export default function Home() {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center gap-10 flex-col">
      <SetUsername />
    </div>
  );
}
