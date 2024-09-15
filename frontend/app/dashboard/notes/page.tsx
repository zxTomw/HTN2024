import Link from "next/link";
import { Notes } from "./notes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockNoteBriefArray = [
  {
    id: "1",
    title: "Data Structure and Algorithms",
  },
  {
    id: "2",
    title: "React Hooks",
  },
  {
    id: "3",
    title: "Next.js",
  },
  {
    id: "4",
    title: "Tailwind CSS",
  },
];

export default async function page() {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center gap-10 flex-col">
      <div className="flex flex-col gap-5 w-2/3 h-2/3 items-baseline justify-center">
        <h1 className="text-2xl ">
          Hey! 👋 <br />
          Manage your notes here
        </h1>
        <div className="flex flex-wrap gap-10">
          <Notes noteBriefArray={mockNoteBriefArray} />
          <Link href="notes/scan">
            <Card className="">
              <CardHeader>
                <CardTitle>Create a New Note</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
