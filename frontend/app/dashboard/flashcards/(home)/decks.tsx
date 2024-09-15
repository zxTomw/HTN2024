import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export type deckBrief = {
  id: string;
  title: string;
  description: string;
};

export type DecksProps = {
  deckBriefArray?: string[];
};

export function Decks({ deckBriefArray }: DecksProps) {
  if (!deckBriefArray) {
    return null;
  }
  return (
    <>
      {deckBriefArray.map((title) => (
        <Link href={`/dashboard/flashcards/${title}`} key={title}>
          <Card className="h-full w-32">
            <CardHeader className="w-full h-full items-center justify-center">
              <CardTitle>{title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </>
  );
}
