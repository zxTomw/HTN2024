import { Button } from "@/components/ui/button";
import { FlashcardView } from "./flashcard-view";
import { Star } from "lucide-react";

const flashcards = [
  { id: "1", front: "What is the capital of France?", back: "Paris" },
  { id: "2", front: "What is the capital of Germany?", back: "Berlin" },
  { id: "3", front: "What is the capital of Spain?", back: "Madrid" },
  { id: "4", front: "What is the capital of Italy?", back: "Rome" },
  { id: "5", front: "What is the capital of Portugal?", back: "Lisbon" },
  {
    id: "6",
    front: "What is the capital of the United Kingdom?",
    back: "London",
  },
  {
    id: "7",
    front: "What is the capital of the United States?",
    back: "Washington, D.C.",
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-dvh flex-col gap-5 w-dvw flex justify-center items-center">
      <h1 className="text-2xl font-bold">Deck {params.id}</h1>
      <FlashcardView deck={flashcards} />

      <Button>
        <Star className="h-5 w-5 pr-2" /> Save
      </Button>
    </div>
  );
}
