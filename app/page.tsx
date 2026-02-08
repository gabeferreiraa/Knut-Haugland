'use client'
import HeroVideo from "@/components/Player";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="h-screen bg-white text-black overflow-hidden">
<header className="px-4 sm:px-8 py-3">
  <nav className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center">
    {/* Left */}
    <div className="justify-self-start">
      <Link
        href="/"
        className="text-lg font-medium text-black hover:text-black/70"
      >
        Home
      </Link>
    </div>

    {/* Center */}
    <div className="justify-self-center">
      <Image
        src="/images/Agent7Logo.png"
        width={200}
        height={100}
        alt="Agent 7 logo"
        priority
      />
    </div>

    {/* Right spacer (keeps true centering) */}
    <div />
  </nav>
</header>

      {/* Content */}
      <section className="px-4 sm:px-8 pb-8">
        <div className="mx-auto w-full max-w-6xl mt-2 ">

          {/* Video area */}
          <div className="mt-4 flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="aspect-auto w-full rounded-none">
                <HeroVideo 
                  playbackId="Vx8vac4kt16uj5blz01zGh95jCpzEy73LUb00fiA5KbnI"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/support"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
            >
              Interested
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}