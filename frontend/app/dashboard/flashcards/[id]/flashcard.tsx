"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FlashCard } from "./flashcard-view";

export function Flashcard({ card: { front, back } }: { card: FlashCard }) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <Card
      className="overflow-hidden cursor-pointer"
      onClick={() => {
        setIsFlipped((prev) => !prev);
      }}
    >
      {isFlipped ? (
        <CardContent className="flex aspect-square  items-center justify-center p-6 bg-slate-50 rounded-md ">
          <span className="text-4xl font-semibold">{back}</span>
        </CardContent>
      ) : (
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <span className="text-4xl font-semibold">{front}</span>
        </CardContent>
      )}
    </Card>
  );
}
