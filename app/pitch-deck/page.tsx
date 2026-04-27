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
          <div className="flex items-center justify-between mt-8 mb-6">
            <h1 className="text-2xl font-bold text-black">{t.pitchDeckTitle}</h1>
            <a
              href="/files/agent7-pitch-deck.pdf"
              download
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
            >
              {t.downloadPdf}
            </a>
          </div>

          <div className="w-full rounded-lg overflow-hidden border border-black/10">
            <iframe
              src="/files/agent7-pitch-deck.pdf"
              className="w-full"
              style={{ height: '80vh' }}
              title="Agent 7 Pitch Deck"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
