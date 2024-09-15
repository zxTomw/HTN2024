"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FlashCard } from "@/app/dashboard/flashcards/generate-cards/result/gen-deck";
import { revalidatePath } from "next/cache";

const baseUrl = "http://127.0.0.1:8000/api";

export async function createUser(user: string) {
  const cookieStore = cookies();
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
    }),
  });
  cookieStore.set("user", user);
  redirect("/dashboard");
}

type DeckBriefDB = {
  id: string;
  title: string;
  description: string;
};

export async function getDecks(user: string): Promise<string[]> {
  const response = await fetch(`${baseUrl}/users/${user}/decks`);
  return response.json();
}

export async function getDeck(user: string, deckName: string) {
  const response = await fetch(`${baseUrl}/users/${user}/decks/${deckName}`);
  const data: [string, string][] = await response.json();
  return data.map(([front, back]) => ({ id: front, front, back }));
}

export async function saveDeck(
  user: string,
  deckName: string,
  deck: {
    front: string;
    back: string;
  }[]
) {
  const dResponse = await fetch(`${baseUrl}/users/${user}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deck_name: deckName,
    }),
  });
  const cards = deck.map(({ front, back }) => [front, back]);
  const cResponse = await fetch(`${baseUrl}/users/${user}/decks/${deckName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cards),
  });
  revalidatePath(`/dashboard/flashcards`);
  return {
    deck: dResponse.json(),
    cards: cResponse.json(),
  };
}
