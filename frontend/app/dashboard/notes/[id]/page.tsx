import { Separator } from "@radix-ui/react-separator";

export default async function Page() {
  return (
    <div className="pt-10 pl-2 h-full flex-col flex">
      <textarea className=" outline-none px-20" />
      <Separator />
      <textarea className="h-fit bg-slate-400 w-full outline-none px-20"></textarea>
    </div>
  );
}
