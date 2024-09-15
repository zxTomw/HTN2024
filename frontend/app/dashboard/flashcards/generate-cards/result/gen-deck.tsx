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
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDeck } from "@/lib/user";
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export type FlashCard = {
  id: string;
  front: string;
  back: string;
  deckId?: string;
};

export type FlashcardViewProps = {
  deck?: FlashCard[];
  user?: string;
};
export function GenDeck({ deck, user }: FlashcardViewProps) {
  const [deckName, setDeckName] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const genDeck = JSON.parse(searchParams.get("deck") || "[]") as FlashCard[];
  const deckForSave = genDeck.map((fc) => {
    const { front, back } = fc;
    return { front, back };
  });
  if (!genDeck.length) {
    return (
      <div className=" flex items-center justify-center text-2xl font-semibold">
        Your deck is not here
      </div>
    );
  }

  return (
    <>
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
      {user && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Star className="h-5 w-5 pr-2" /> Save
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Save Deck</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  id="name"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => saveDeck(user, deckName!, deckForSave)}
                disabled={!deckName}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
