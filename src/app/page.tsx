import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] items-center ">
      <Image alt="" src="/background.png" objectFit="cover" fill={true} />
    </main>
  );
}
