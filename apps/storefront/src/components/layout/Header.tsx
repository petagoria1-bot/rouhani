import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => (
  <header className="sticky top-0 z-50 border-b border-[#3b151a] bg-[#050306]/94 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#7f0b18]/50 bg-[#100407] text-xl text-[#c21d31] shadow-[0_0_28px_rgba(127,11,24,.25)]">⛧</span>
        <span className="text-xl font-black tracking-tight">روحاني</span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        <Link href="/" className="text-sm font-bold text-[#bcaea4] hover:text-white">الرئيسية</Link>
        <Link href="/services" className="text-sm font-bold text-[#bcaea4] hover:text-white">الخدمات</Link>
        <a href="/#how" className="text-sm font-bold text-[#bcaea4] hover:text-white">كيف تعمل؟</a>
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/login" className="hidden rounded-xl border border-[#3b151a] px-4 py-2 text-sm font-bold text-[#bcaea4] hover:bg-white/5 sm:block">دخول</Link>
        <Link href="/services" className="rounded-xl occult-button px-4 py-2 text-sm font-bold hover:bg-[#ad1224]">ابدأ الآن</Link>
      </div>
    </div>
  </header>
);