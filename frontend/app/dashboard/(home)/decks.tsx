import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Card key={deck.id}>
          <CardHeader>
            <CardTitle>{deck.title}</CardTitle>
          </CardHeader>
          <CardContent>{deck.description}</CardContent>
        </Card>
      ))}
    </>
  );
}
