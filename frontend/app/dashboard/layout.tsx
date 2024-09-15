import Link from "next/link";
import { Navbar } from "./navbar";
import { cookies } from "next/headers";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  return (
    <div className="h-dvh w-dvw ">
      <Navbar user={user} />
      <div className="h-full overflow-hidden">{children}</div>
    </div>
  );
}
