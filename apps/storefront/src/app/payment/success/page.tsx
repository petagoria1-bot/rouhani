import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-5 py-16 text-center">
      <section className="w-full rounded-[1.75rem] border border-[#3b151a] bg-[#090508] p-8 shadow-[0_0_50px_rgba(127,11,24,.12)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#7f0b18] bg-[#18070b] text-2xl occult-gold">
          ✓
        </div>
        <p className="mt-6 text-xs font-bold occult-gold-soft">تم استلام الدفع</p>
        <h1 className="mt-2 text-3xl font-black occult-gold">شكراً لك</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#b8aaa0]">
          تم إرسال عملية الدفع إلى النظام. سيتم التعامل مع الطلب بعد تأكيد الدفع من Stripe.
        </p>
        <Link
          href="/services"
          className="mt-7 inline-flex rounded-xl occult-button px-6 py-3 font-bold"
        >
          العودة إلى الخدمات
        </Link>
      </section>
    </main>
  );
}
