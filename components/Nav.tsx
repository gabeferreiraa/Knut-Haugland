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
    <header className="px-4 sm:px-8 py-6">
      <nav className="mx-auto w-full max-w-6xl">
        {/* Desktop nav */}
        <div className="hidden md:flex items-center relative">
          {/* Centered links */}
          <div className="flex items-center gap-6 mx-auto">
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
            <Link href="/investors" className="text-sm font-medium text-black hover:text-black/70">
              {t.investors}
            </Link>
          </div>

          {/* Left: logo */}
          <div className="absolute left-0">
            <Image
              src="/images/Agent7Logo.png"
              width={120}
              height={60}
              alt="Agent 7 logo"
              priority
            />
          </div>

          {/* Right: language toggle */}
          <div className="absolute right-0 flex items-center gap-1">
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
              width={100}
              height={50}
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
              <Link href="/investors" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-black">
                {t.investors}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
