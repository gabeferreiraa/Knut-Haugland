'use client';

import Nav from '@/components/Nav';
import { useLanguage } from '@/lib/language-context';
import translations from '@/lib/translations';

export default function EndorsementsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="px-4 sm:px-8 pb-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mt-8 mb-10" />

          <div className="space-y-16">
            {/* Endorsement 1 — Kon-Tiki Museum (Liv Heyerdahl letter) */}
            <article>
              <h2 className="text-lg font-semibold text-black mb-1">
                {t.endorsement1.org}
              </h2>
              <p className="text-sm text-black/60 mb-4">
                {t.endorsement1.author}
              </p>
              <div className="w-full border border-black/10 rounded overflow-hidden">
                <iframe
                  src="/files/agent7_letter.pdf"
                  className="w-full"
                  style={{ height: '80vh', minHeight: '600px' }}
                  title={`${t.endorsement1.org} — ${t.endorsementLetterLabel}`}
                />
              </div>
              <a
                href="/files/agent7_letter.pdf"
                download
                className="inline-block mt-3 text-sm font-medium text-black underline underline-offset-2 hover:text-black/70"
              >
                {t.downloadLetter}
              </a>
            </article>

            {/* Endorsement 2 — Norsk Industriarbeidermuseum */}
            <article>
              <h2 className="text-lg font-semibold text-black mb-1">
                {t.endorsement2.org}
              </h2>
              <p className="text-sm text-black/60 mb-4">
                {t.endorsement2.name}, {t.endorsement2.title}
              </p>
              <div className="border-l-4 border-black/20 pl-6">
                <p className="text-sm text-black/85 mb-3">{t.endorsement2.greeting}</p>
                <blockquote className="text-sm leading-relaxed text-black/85 italic">
                  {t.endorsement2.body}
                </blockquote>
                <div className="mt-4 text-sm text-black">
                  <p>{t.endorsement2.closing}</p>
                  <p className="font-medium mt-1">{t.endorsement2.name}</p>
                  <p className="text-black/60">{t.endorsement2.title}</p>
                  <p className="text-black/60">{t.endorsement2.org}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
