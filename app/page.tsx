'use client'
import HeroVideo from "@/components/Player";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="h-screen bg-background text-white overflow-hidden">
      {/* Top nav */}
      <header className="px-4 sm:px-8 py-6">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-white"
          >
            Home
          </Link>

          {/* <Link
            href="/support"
            className="text-sm font-medium text-white hover:text-white"
          >
            Support
          </Link> */}
        </nav>
      </header>

      {/* Content */}
      <section className="px-4 sm:px-8 pb-16">
        <div className="mx-auto w-full max-w-6xl mt-5">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold tracking-tight">
            Agent 7
          </h1>

          {/* Video area */}
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-4xl">
              <div className=" aspect-auto w-full rounded-none ">
                <HeroVideo 
                playbackId="5nLPTUMSO2pBihFvUMVvj00dUPv2ATTzFnE7lEJmsc44"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/support"
              className="rounded-full bg-black/10 px-6 py-3 text-sm font-medium text-white "
            >
              Interested
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}