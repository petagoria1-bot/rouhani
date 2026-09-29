'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type SessionState = {
  loading: boolean;
  paid: boolean;
  error: string;
  serviceName: string;
};

export default function PaymentSuccessPage() {
  const [state, setState] = useState<SessionState>({
    loading: true,
    paid: false,
    error: '',
    serviceName: '',
  });

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (!sessionId) {
      setState({ loading: false, paid: false, error: 'لم يتم العثور على جلسة الدفع.', serviceName: '' });
      return;
    }

    fetch(`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`, {
      cache: 'no-store',
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'تعذر التحقق من الدفع.');
        return data;
      })
      .then((data) => {
        const paid = data.paymentStatus === 'paid';
        setState({
          loading: false,
          paid,
          error: paid ? '' : 'الدفع لم يُؤكَّد بعد. إذا تم الخصم، انتظر قليلاً ثم تحقق من بريدك الإلكتروني.',
          serviceName: data.serviceName || '',
        });
      })
      .catch((error) => {
        setState({
          loading: false,
          paid: false,
          error: error instanceof Error ? error.message : 'تعذر التحقق من الدفع.',
          serviceName: '',
        });
      });
  }, []);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-5 py-16 text-center">
      <section className="w-full rounded-[1.75rem] border border-[#3b151a] bg-[#090508] p-8 shadow-[0_0_50px_rgba(127,11,24,.12)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#7f0b18] bg-[#18070b] text-2xl occult-gold">
          {state.loading ? '…' : state.paid ? '✓' : '!'}
        </div>

        {state.loading ? (
          <>
            <p className="mt-6 text-xs font-bold occult-gold-soft">جارٍ التحقق</p>
            <h1 className="mt-2 text-3xl font-black occult-gold">نتحقق من عملية الدفع…</h1>
          </>
        ) : state.paid ? (
          <>
            <p className="mt-6 text-xs font-bold occult-gold-soft">تم تأكيد الدفع</p>
            <h1 className="mt-2 text-3xl font-black occult-gold">شكراً لك</h1>
            {state.serviceName && (
              <p className="mt-3 text-sm occult-gold-soft">{state.serviceName}</p>
            )}
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#b8aaa0]">
              تم تأكيد الدفع بنجاح. ستتم معالجة الطلب بعد تسجيل التأكيد في النظام.
            </p>
          </>
        ) : (
          <>
            <p className="mt-6 text-xs font-bold text-[#d8a8a8]">لم يتم التأكيد</p>
            <h1 className="mt-2 text-3xl font-black occult-gold">الدفع قيد التحقق</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#b8aaa0]">{state.error}</p>
          </>
        )}

        <Link href="/services" className="mt-7 inline-flex rounded-xl occult-button px-6 py-3 font-bold">
          العودة إلى الخدمات
        </Link>
      </section>
    </main>
  );
}
