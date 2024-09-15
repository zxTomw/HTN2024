"use client";
import { useSetUserName, useUserName } from "@/components/root-providers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createUser } from "@/lib/user";

export function Navbar({ user }: { user?: string }) {
  return (
    <nav className="h-2 w-2 absolute top-5 flex p-2 px-5 gap-10 items-center">
      <Link href={"/dashboard/notes"}>Notes</Link>
      <Link href={"/dashboard/flashcards"}>Flashcards</Link>
      <div className="flex-grow" />
      {user ?? " Not logged in"}
    </nav>
  );
}
