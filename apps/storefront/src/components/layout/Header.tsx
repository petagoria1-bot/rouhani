import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => (
  <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090714]/90 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl shadow-lg shadow-violet-900/30">✦</span>
        <span className="text-xl font-black tracking-tight">روحاني</span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        <Link href="/" className="text-sm font-bold text-slate-300 hover:text-white">الرئيسية</Link>
        <Link href="/services" className="text-sm font-bold text-slate-300 hover:text-white">الخدمات</Link>
        <a href="/#how" className="text-sm font-bold text-slate-300 hover:text-white">كيف تعمل؟</a>
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/login" className="hidden rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-white/5 sm:block">دخول</Link>
        <Link href="/services" className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold hover:bg-violet-400">ابدأ الآن</Link>
      </div>
    </div>
  </header>
);