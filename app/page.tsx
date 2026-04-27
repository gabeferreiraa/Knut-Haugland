'use client'
import HeroVideo from "@/components/Player";
import Nav from "@/components/Nav";

export default function HomePage() {
  return (
    <main className="h-screen bg-white text-black overflow-hidden">
      <Nav />

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

        </div>
      </section>
    </main>
  );
}
