import Link from "next/link";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-dvw ">
      <Navbar />
      <div className="h-full overflow-hidden">{children}</div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="h-2 w-2 absolute top-0 flex p-2 px-5 gap-10">
      <Link href={"/dashboard/notes"}>Notes</Link>
      <Link href={"/dashboard/flashcards"}>Flashcards</Link>
    </nav>
  );
}
