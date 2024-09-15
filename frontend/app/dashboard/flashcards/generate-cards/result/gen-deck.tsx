"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Flashcard } from "../../[id]/flashcard";
import { useSearchParams } from "next/navigation";

export type FlashCard = {
  id: string;
  front: string;
  back: string;
  deckId?: string;
};

export type FlashcardViewProps = {
  deck?: FlashCard[];
};
export function GenDeck({ deck }: FlashcardViewProps) {
  const searchParams = useSearchParams();
  const genDeck = JSON.parse(searchParams.get("deck") || "[]") as FlashCard[];
  if (!genDeck.length) {
    return (
      <div className=" flex items-center justify-center text-2xl font-semibold">
        Your deck is not here
      </div>
    );
  }

  return (
    <div>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {genDeck.map((fc) => (
            <CarouselItem key={fc.id}>
              <div className="p-1">
                <Flashcard card={fc} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
