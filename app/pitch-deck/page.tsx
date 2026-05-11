'use client';

import Nav from '@/components/Nav';
import { useLanguage } from '@/lib/language-context';
import translations from '@/lib/translations';

export default function PitchDeckPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="px-4 sm:px-8 pb-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mt-8" />

          <div className="w-full rounded-lg overflow-hidden border border-black/10">
            <iframe
              src="/files/agent7-pitch-deck.pdf"
              className="w-full"
              style={{ height: '80vh' }}
              title="Agent 7 Pitch Deck"
            />
          </div>
          <a
            href="/files/agent7-pitch-deck.pdf"
            download
            className="inline-block mt-3 text-sm font-medium text-black underline underline-offset-2 hover:text-black/70"
          >
            {t.downloadPdf}
          </a>
        </div>
      </section>
    </main>
  );
}
