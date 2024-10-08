import { Button } from "@/components/ui/button";
import { FlashcardView } from "../../[id]/flashcard-view";
import { Star } from "lucide-react";
import { GenDeck } from "./gen-deck";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  return (
    <div className="h-dvh flex-col gap-5 w-dvw flex justify-center items-center">
      <h1 className="text-2xl font-bold">Deck {params.id}</h1>
      <GenDeck user={user} />
    </div>
  );
}
