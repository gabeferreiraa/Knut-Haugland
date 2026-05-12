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

          {/* PDF viewer — hidden on small screens where iframes don't render PDFs well */}
          <div className="hidden sm:block w-full rounded-lg overflow-hidden border border-black/10">
            <iframe
              src="/files/agent7-pitch-deck.pdf"
              className="w-full"
              style={{ height: '80vh', minHeight: '500px' }}
              title="Agent 7 Pitch Deck"
            />
          </div>

          {/* Mobile fallback — prominent download button */}
          <div className="sm:hidden flex flex-col items-center justify-center py-12 px-4 border border-black/10 rounded-lg text-center">
            <svg className="w-12 h-12 text-black/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 2H6a2 2 0 00-2 2v16m0 0h16" />
            </svg>
            <p className="text-sm text-black/70 mb-4">{t.downloadPdf}</p>
            <a
              href="/files/agent7-pitch-deck.pdf"
              download
              className="inline-block rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90 transition-colors"
            >
              {t.downloadPdf}
            </a>
          </div>

          <a
            href="/files/agent7-pitch-deck.pdf"
            download
            className="hidden sm:inline-block mt-3 text-sm font-medium text-black underline underline-offset-2 hover:text-black/70"
          >
            {t.downloadPdf}
          </a>
        </div>
      </section>
    </main>
  );
}
