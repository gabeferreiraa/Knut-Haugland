// app/support/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background ">
      {/* Top nav */}
      <header className="px-4 sm:px-8 py-6 text-white">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-foreground"
          >
            Home
          </Link>

        </nav>
      </header>

      <section className="px-4 sm:px-8 pb-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* Full-width statement */}
          <div className=" bg-background text-white px-6 sm:px-10 py-8">
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              Project Statement
            </h1>

            <div className="mt-5 space-y-5 text-sm leading-7 tracking-normal text-white/85">
              <p>
                American cousins Kip Prestholdt and Jeremy Prestholdt set out to
                tell the story of their relative, Knut Haugland — a man who helped
                change the course of history, yet never sought recognition for it.
              </p>

              <p>
                Knut was hardworking, humble, and deeply private. He avoided the
                spotlight, rarely gave interviews, and had little interest in
                telling his own story. As a result, his extraordinary life remained
                largely unknown outside Norway for decades.
              </p>

              <p>
                It wasn’t until 2009 — just one year before his death — that
                Norwegian journalist Svein Sæter documented Knut’s full story in
                his biography <span className="italic">Operator</span>. Even then,
                the story never reached a global audience.
              </p>

              <p>
                In 2025, filmmaker Kip Prestholdt discovered{" "}
                <span className="italic">Operator</span> for the first time. What
                he found was not just a remarkable life — but a story that demanded
                to be seen. Within days, he reached out to his cousin Jeremy
                Prestholdt, a historian at the University of California, San Diego.
                Friends since childhood, Kip and Jeremy immediately knew this was a
                journey they needed to take together.
              </p>

              <p>
                This project is being developed with the full support and
                encouragement of the Haugland family, who believe the time has come
                for Knut’s story to be shared with a wider audience.
              </p>

              <p>
                This film is both a historical reckoning and a personal quest — to
                finally give credit to a man whose quiet courage helped shape the
                modern world. Thank you for taking the time to watch our teaser
                trailer.
              </p>

              <p>
                By early summer 2026, we will have a complete film package ready,
                including a pitch deck, script, production schedule, and budget.
              </p>

              <p>
                We are seeking a Norwegian production partner who shares our belief
                in the importance of Knut Haugland’s story — and who can help
                connect us with foundations, grants, organizations, and individuals
                interested in supporting this project.
              </p>

              <p>
                If you would like to continue the conversation and explore how you
                might be part of bringing this film to life, please leave your
                contact information below. We would love to connect.
              </p>

              <p className="pt-2 text-white/85">
                With sincere thanks,
                <br />
                <span className="font-medium">Kip &amp; Jeremy Prestholdt</span>
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="  p-4">
              <div className=" w-full bg-cover">
              <Image 
              src={"/images/img002.jpeg"}
              height={400}
              width={400}
              alt="Just a dude"
              />
              </div>
              <p className="mt-3 text-xs text-black/50">
                Custom message awaiting...
              </p>
            </div>

            {/* Donation / contact (bottom right half) */}
            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-black/80">
                Continue the conversation
              </h2>
              <p className="mt-2 text-xs leading-5 text-black/55">
                Leave your contact information and we’ll follow up with the film
                package and next steps.
              </p>

              <div className="mt-6 space-y-4">
                <Field label="First Name" name="firstName" />
                <Field label="Last Name" name="lastName" />
                <Field label="Email" name="email" type="email" />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-black px-6 py-2 text-sm font-medium text-white hover:bg-black/90"
                >
                  Submit
                </button>
              </div>

              {/* Optional “donation” CTA area */}
              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="text-xs text-black/55">
                  Want to support the project?
                </p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-md bg-black/10 px-4 py-2 text-sm font-medium text-black/70 hover:bg-black/15 hover:text-black"
                >
                  Support / Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-black/60">{label}</span>
      <input
        name={name}
        type={type}
        className="mt-2 w-full rounded-md border border-black/10 bg-black/5 px-3 py-2 text-sm text-black outline-none focus:border-black/30 focus:bg-white"
      />
    </label>
  );
}