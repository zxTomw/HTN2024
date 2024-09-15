"use client";

import { useSetUserName, useUserName } from "@/components/root-providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { useState } from "react";

export function SetUsername() {
  const [userName, setUserName] = useState<string | null>(null);
  const setName = useSetUserName();
  return (
    <div className="flex gap-5">
      <Input
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        placeholder="Enter your name"
      />
      <Button
        onClick={() => {
          userName && createUser(userName);
        }}
      >
        Set User Name
      </Button>
    </div>
  );
}
