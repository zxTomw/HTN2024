import { Button } from "@/components/ui/button";

export default async function Home() {
  const data= await (await fetch("http://127.0.0.1:5000/api")).json() 
// takes the stuff from backend into json 
 

  return (
    <div className="h-dvh w-dvw flex justify-center items-center gap-5 flex-col">
      <h1 className="text-2xl font-bold">Flash It</h1>
      <div className="w-1/3 h-1/3 flex items-center justify-center border-2 border-primary rounded-md">
        Upload Notes
      </div>
      <Button>Generate Flashcards {data.msg} </Button>
    </div>
  );
}
