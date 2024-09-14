import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export type noteBrief = {
  id: string;
  title: string;
};

export type DecksProps = {
  noteBriefArray: noteBrief[];
};

export function Notes({ noteBriefArray }: DecksProps) {
  return (
    <>
      {noteBriefArray.map(({ id, title }) => (
        <Link href={`/dashboard/notes/${id}`} key={id}>
          <Card className="h-56 w-44">
            <CardContent className="flex w-full h-full items-center justify-center">
              <span className="text-xl font-semibold">{title}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
