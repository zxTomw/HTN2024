import { Button } from "@/components/ui/button";
import { FlashcardView } from "./flashcard-view";
import { Star } from "lucide-react";
import { cookies } from "next/headers";
import { getDeck } from "@/lib/user";

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  if (!user) {
    return null;
  }
  const deck = await getDeck(user, params.id);
  console.log(deck);
  return (
    <div className="h-dvh flex-col gap-5 w-dvw flex justify-center items-center">
      <h1 className="text-2xl font-bold">Deck {params.id}</h1>
      <FlashcardView deck={deck} />

      <Button>
        <Star className="h-5 w-5 pr-2" /> Save
      </Button>
    </div>
  );
}
