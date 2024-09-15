import { Button } from "@/components/ui/button";
import { FlashcardView } from "../../[id]/flashcard-view";
import { Star } from "lucide-react";
import { GenDeck } from "./gen-deck";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-dvh flex-col gap-5 w-dvw flex justify-center items-center">
      <h1 className="text-2xl font-bold">Deck {params.id}</h1>
      <GenDeck />

      <Button>
        <Star className="h-5 w-5 pr-2" /> Save
      </Button>
    </div>
  );
}
