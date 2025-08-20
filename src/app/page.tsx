import Image from "next/image";

import Chat from "@/app/features/Chat";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full">
      <Image
        alt=""
        src="/background.png"
        objectFit="cover"
        fill={true}
        className="z-[-1]"
      />
      <Chat />
    </main>
  );
}
