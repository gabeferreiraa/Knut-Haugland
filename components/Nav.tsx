'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import translations from '@/lib/translations';
import { useState } from 'react';

export default function Nav() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="px-4 sm:px-8 py-3">
      <nav className="mx-auto w-full max-w-6xl">
        {/* Desktop nav */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-black hover:text-black/70">
              {t.home}
            </Link>
            <Link href="/pitch-deck" className="text-sm font-medium text-black hover:text-black/70">
              {t.pitchDeck}
            </Link>
            <Link href="/endorsements" className="text-sm font-medium text-black hover:text-black/70">
              {t.endorsements}
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-black hover:text-black/70"
            >
              {t.about}
            </Link>
          </div>

          {/* Center logo */}
          <div>
            <Image
              src="/images/Agent7Logo.png"
              width={200}
              height={100}
              alt="Agent 7 logo"
              priority
            />
          </div>

          {/* Right: language toggle */}
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                language === 'en'
                  ? 'bg-black text-white'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              ENG
            </button>
            <span className="text-black/30">|</span>
            <button
              onClick={() => setLanguage('no')}
              className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                language === 'no'
                  ? 'bg-black text-white'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              NOR
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-black"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Image
              src="/images/Agent7Logo.png"
              width={150}
              height={75}
              alt="Agent 7 logo"
              priority
            />

            {/* Language toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  language === 'en' ? 'bg-black text-white' : 'text-black/60'
                }`}
              >
                ENG
              </button>
              <button
                onClick={() => setLanguage('no')}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  language === 'no' ? 'bg-black text-white' : 'text-black/60'
                }`}
              >
                NOR
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="mt-3 flex flex-col gap-3 border-t border-black/10 pt-3">
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-black">
                {t.home}
              </Link>
              <Link href="/pitch-deck" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-black">
                {t.pitchDeck}
              </Link>
              <Link href="/endorsements" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-black">
                {t.endorsements}
              </Link>
              <Link href="/support" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-black">
                {t.about}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
