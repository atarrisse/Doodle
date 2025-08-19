import Image from "next/image";

import Chat from "@/app/features/Chat";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] items-center ">
      <Image alt="" src="/background.png" objectFit="cover" fill={true} className="z-[-1]"/>
      <Chat />
    </main>
  );
}
