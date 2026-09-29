import './globals.css';
import type { Metadata } from 'next';
import { Layout } from '../components/layout/Layout';

export const metadata: Metadata = {
  title: 'روحاني | خدمات روحانية عربية',
  description: 'منصة عربية لتجارب وخدمات روحانية رقمية مخصصة.',
  keywords: 'روحانيات، خدمات روحانية، قراءة رمزية، محبة، مودة، تأمل',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#050306] text-[#d7c9b5] antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}