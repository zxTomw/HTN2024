import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Flashcard } from "./flashcard";

export type FlashCard = {
  id: string;
  front: string;
  back: string;
  deckId?: string;
};

export type FlashcardViewProps = {
  deck: FlashCard[];
};
export function FlashcardView({ deck }: FlashcardViewProps) {
  return (
    <div>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {deck.map((fc) => (
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
