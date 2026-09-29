import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => (
  <footer className="border-t border-white/10 bg-black/20">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 lg:px-8">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-lg">✦</span>
          <span className="text-lg font-black">روحاني</span>
        </div>
        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
          منصة عربية لتجارب روحانية ورمزية رقمية، مع ملفات مخصصة بصيغة PDF.
        </p>
      </div>

      <div>
        <h3 className="font-bold">روابط</h3>
        <div className="mt-4 grid gap-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-white">الرئيسية</Link>
          <Link href="/services" className="hover:text-white">الخدمات</Link>
          <Link href="/privacy" className="hover:text-white">الخصوصية</Link>
          <Link href="/terms" className="hover:text-white">الشروط والأحكام</Link>
        </div>
      </div>

      <div>
        <h3 className="font-bold">مهم</h3>
        <p className="mt-4 text-sm leading-7 text-slate-500">
          الخدمات المقدمة رمزية وروحانية ولا تمثل وعدًا بنتيجة عاطفية، ولا تهدف إلى التحكم في إرادة أو قرارات أي شخص.
        </p>
      </div>
    </div>
    <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-600">
      © {new Date().getFullYear()} روحاني — جميع الحقوق محفوظة
    </div>
  </footer>
);