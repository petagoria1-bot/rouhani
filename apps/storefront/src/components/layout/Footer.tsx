import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => (
  <footer className="border-t border-[#3b151a] bg-[#070407]">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 lg:px-8">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7f0b18] text-lg">✦</span>
          <span className="text-lg font-black">روحاني</span>
        </div>
        <p className="mt-4 max-w-sm text-sm leading-7 text-[#756963]">
          منصة عربية لتجارب روحانية ورمزية رقمية، مع ملفات مخصصة بصيغة PDF.
        </p>
      </div>

      <div>
        <h3 className="font-bold">روابط</h3>
        <div className="mt-4 grid gap-3 text-sm text-[#756963]">
          <Link href="/" className="hover:text-[#e7d9cd]">الرئيسية</Link>
          <Link href="/services" className="hover:text-[#e7d9cd]">الخدمات</Link>
          <Link href="/privacy" className="hover:text-[#e7d9cd]">الخصوصية</Link>
          <Link href="/terms" className="hover:text-[#e7d9cd]">الشروط والأحكام</Link>
        </div>
      </div>

      <div>
        <h3 className="font-bold">مهم</h3>
        <p className="mt-4 text-sm leading-7 text-[#756963]">
          الخدمات المقدمة رمزية وروحانية ولا تمثل وعدًا بنتيجة عاطفية، ولا تهدف إلى التحكم في إرادة أو قرارات أي شخص.
        </p>
      </div>
    </div>
    <div className="border-t border-[#3b151a] px-6 py-5 text-center text-xs text-[#5f514c]">
      © {new Date().getFullYear()} روحاني — جميع الحقوق محفوظة
    </div>
  </footer>
);