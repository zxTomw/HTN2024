import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Decks } from "./decks";
const mockDeckBriefs = [
  {
    id: "1",
    title: "Deck 1",
    description: "This is a deck",
  },
  {
    id: "2",
    title: "Deck 2",
    description: "This is another deck",
  },
  {
    id: "3",
    title: "Deck 3",
    description: "This is a third deck",
  },
];

export default function Home() {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center gap-10 flex-col">
      <div className="flex flex-col gap-5 w-2/3 h-2/3 items-baseline justify-center">
        <h1 className="text-2xl ">
          Hi there! 👋 <br />
          Manage and create your Decks here
        </h1>
        <div className="flex gap-10">
          <Decks deckBriefArray={mockDeckBriefs} />
          <Card>
            <CardHeader>
              <CardTitle>Create a New Deck</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
