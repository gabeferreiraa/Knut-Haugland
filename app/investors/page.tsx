'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import { useLanguage } from '@/lib/language-context';
import translations from '@/lib/translations';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from 'recharts';

const STATIC_PASSWORD = 'agent7invest';

const COLORS = ['#000000', '#404040', '#6b6b6b', '#8c8c8c', '#b0b0b0', '#d4d4d4'];

const budgetData = [
  { name: 'Pre-Production', value: 450000 },
  { name: 'Principal Photography', value: 1600000 },
  { name: 'Post-Production', value: 1100000 },
  { name: 'Music & Licensing', value: 400000 },
  { name: 'Marketing & Distribution', value: 700000 },
  { name: 'Contingency', value: 250000 },
];

const revenueData = [
  { name: 'Theatrical', projected: 2800000, conservative: 1400000 },
  { name: 'Streaming/VOD', projected: 3500000, conservative: 2000000 },
  { name: 'International', projected: 2200000, conservative: 1100000 },
  { name: 'Educational', projected: 600000, conservative: 300000 },
  { name: 'Festivals', projected: 400000, conservative: 200000 },
];

const trendsData = [
  { year: '2019', audience: 100, streaming: 100, theatrical: 100 },
  { year: '2020', audience: 125, streaming: 155, theatrical: 45 },
  { year: '2021', audience: 140, streaming: 190, theatrical: 65 },
  { year: '2022', audience: 160, streaming: 210, theatrical: 90 },
  { year: '2023', audience: 185, streaming: 245, theatrical: 105 },
  { year: '2024', audience: 205, streaming: 280, theatrical: 120 },
  { year: '2025', audience: 230, streaming: 320, theatrical: 135 },
];

const compsData = [
  { name: 'Free Solo', budget: 1500000, gross: 29400000 },
  { name: 'The Act of Killing', budget: 1000000, gross: 3400000 },
  { name: 'Kon-Tiki (2012)', budget: 15600000, gross: 24200000 },
  { name: 'The Imitation Game', budget: 14000000, gross: 233600000 },
  { name: '13th', budget: 1000000, gross: 2100000 },
];

function formatDollar(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
}

function Card({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="border border-black/10 rounded-lg p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold text-black mb-1">{title}</h2>
      <p className="text-xs sm:text-sm text-black/60 mb-4 sm:mb-6">{description}</p>
      {children}
    </div>
  );
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

export default function InvestorsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const isMobile = useIsMobile();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === STATIC_PASSWORD) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="px-4 sm:px-8 pb-16">
        {!authenticated ? (
          <div className="mx-auto w-full max-w-2xl mt-16 text-center">
            <h1 className="text-2xl font-bold text-black mb-8">
              {t.investors}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
              <label htmlFor="investor-password" className="block text-sm font-medium text-black">
                {t.investorsPasswordLabel}
              </label>
              <input
                id="investor-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder={t.investorsPasswordPlaceholder}
                className="w-full rounded-md border border-black/20 px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20"
              />
              {error && (
                <p className="text-sm text-red-600">{t.investorsIncorrect}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
              >
                {t.investorsSubmit}
              </button>
            </form>

            <p className="mt-8 text-sm text-black/70 leading-relaxed max-w-md mx-auto">
              {t.investorsMessage}
            </p>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-6xl mt-8 sm:mt-16">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-xl sm:text-2xl font-bold text-black mb-2">
                {t.investorsWelcome}
              </h1>
              <p className="text-sm text-black/70 leading-relaxed">
                {t.investorsContent}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Section 1 — Budget Breakdown (Pie) */}
              <Card title={t.investorsBudgetTitle} description={t.investorsBudgetDesc}>
                <ResponsiveContainer width="100%" height={isMobile ? 260 : 300}>
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      outerRadius={isMobile ? 70 : 100}
                      dataKey="value"
                      label={isMobile ? false : ({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={!isMobile}
                    >
                      {budgetData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatDollar(Number(value))} />
                    <Legend
                      wrapperStyle={{ fontSize: isMobile ? 11 : 14 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Section 2 — Revenue Projections (Bar) */}
              <Card title={t.investorsRevenueTitle} description={t.investorsRevenueDesc}>
                <ResponsiveContainer width="100%" height={isMobile ? 260 : 300}>
                  <BarChart data={revenueData} margin={isMobile ? { left: -10, right: 5 } : undefined}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} angle={isMobile ? -35 : 0} textAnchor={isMobile ? 'end' : 'middle'} height={isMobile ? 60 : 30} />
                    <YAxis tickFormatter={formatDollar} tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 45 : 60} />
                    <Tooltip formatter={(value) => formatDollar(Number(value))} />
                    <Legend wrapperStyle={{ fontSize: isMobile ? 11 : 14 }} />
                    <Bar dataKey="projected" name={t.investorsProjected} fill="#000000" />
                    <Bar dataKey="conservative" name={t.investorsConservative} fill="#a0a0a0" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 mt-6 sm:mt-8">
              {/* Section 3 — Market Trends (Line) */}
              <Card title={t.investorsTrendsTitle} description={t.investorsTrendsDesc}>
                <ResponsiveContainer width="100%" height={isMobile ? 260 : 350}>
                  <LineChart data={trendsData} margin={isMobile ? { left: -10, right: 5 } : undefined}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="year" tick={{ fontSize: isMobile ? 10 : 12 }} />
                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 35 : 60} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: isMobile ? 11 : 14 }} />
                    <Line type="monotone" dataKey="audience" name={t.investorsAudience} stroke="#000000" strokeWidth={2} />
                    <Line type="monotone" dataKey="streaming" name={t.investorsStreamingRev} stroke="#6b6b6b" strokeWidth={2} />
                    <Line type="monotone" dataKey="theatrical" name={t.investorsTheatricalRev} stroke="#b0b0b0" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Section 4 — Comparable Films (Horizontal Bar) */}
              <Card title={t.investorsCompsTitle} description={t.investorsCompsDesc}>
                <ResponsiveContainer width="100%" height={isMobile ? 300 : 350}>
                  <BarChart data={compsData} layout="vertical" margin={isMobile ? { left: 0, right: 5 } : undefined}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis type="number" tickFormatter={formatDollar} tick={{ fontSize: isMobile ? 10 : 12 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 90 : 130} />
                    <Tooltip formatter={(value) => formatDollar(Number(value))} />
                    <Legend wrapperStyle={{ fontSize: isMobile ? 11 : 14 }} />
                    <Bar dataKey="budget" name={t.investorsBudget} fill="#a0a0a0" />
                    <Bar dataKey="gross" name={t.investorsGross} fill="#000000" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
