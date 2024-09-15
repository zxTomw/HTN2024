"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Markdown from "react-markdown";

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
export function Textbox({ deck, user }: FlashcardViewProps) {
  const searchParams = useSearchParams();
  const rawres = searchParams.get("response");
  const response: {
    msg: string;
    transcript: string;
  } = rawres
    ? JSON.parse(rawres)
    : {
        msg: "",
        transcript: "",
      };

  return (
    <>
      <Card className="w-1/2 h-2/3 overflow-auto">
        <CardHeader>
          <CardTitle>Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="prose">
            <Markdown>{response.transcript.replaceAll("[0].", ".\n")}</Markdown>
          </span>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card className="w-1/3 h-2/3 overflow-auto">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="prose">
            <Markdown>{response.msg.replaceAll("[0].", ".\n")}</Markdown>
          </span>
        </CardContent>
        <CardFooter className="sticky bottom-0">
          <Button>Create Flashcards</Button>
        </CardFooter>
      </Card>
    </>
  );
}
