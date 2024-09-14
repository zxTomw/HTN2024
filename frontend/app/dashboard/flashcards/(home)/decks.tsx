import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export type deckBrief = {
  id: string;
  title: string;
  description: string;
};

export type DecksProps = {
  deckBriefArray: deckBrief[];
};

export function Decks({ deckBriefArray }: DecksProps) {
  return (
    <>
      {deckBriefArray.map((deck) => (
        <Link href={`/dashboard/flashcards/${deck.id}`} key={deck.id}>
          <Card>
            <CardHeader>
              <CardTitle>{deck.title}</CardTitle>
            </CardHeader>
            <CardContent>{deck.description}</CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
