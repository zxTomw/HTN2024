import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Textbox } from "./textbox";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  return (
    <div className="h-dvh gap-5 w-dvw flex justify-center items-center">
      <Textbox />
    </div>
  );
}
