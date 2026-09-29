import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => (
  <footer className="border-t border-[#3b151a] bg-[#070407]">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7f0b18] text-lg">⛧</span>
          <span className="text-lg font-black">روحاني</span>
        </div>
        <p className="mt-3 text-xs leading-6 text-[#756963]">
          أعمال ومخطوطات رقمية مستوحاة من تراث السحر والطلاسم والأوفاق والعزائم.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#756963]">
        <Link href="/" className="hover:text-[#e7d9cd]">الرئيسية</Link>
        <Link href="/services" className="hover:text-[#e7d9cd]">الأعمال</Link>
      </div>
    </div>
    <div className="border-t border-[#3b151a] px-6 py-4 text-center text-xs text-[#5f514c]">
      © {new Date().getFullYear()} روحاني
    </div>
  </footer>
);
