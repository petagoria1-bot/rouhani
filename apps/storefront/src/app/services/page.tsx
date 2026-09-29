'use client';

import { useState } from 'react';

const services = [
  { id: 'love', icon: '/icons/mahabbah-ulfah-tahyij.svg', title: 'المحبة والعطف والتهييج', short: 'أعمال المحبة والعطف والتهييج', price: 19.9 },
  { id: 'reconcile', icon: '/icons/taqrib.svg', title: 'الوصال والتقريب', short: 'أعمال الوصال والتقريب', price: 24.9 },
  { id: 'marriage', icon: '/icons/ulfah-mawaddah-service.svg', title: 'الألفة والمودة', short: 'أعمال الألفة والمودة والقبول', price: 29.9 },
  { id: 'qabul', icon: '/icons/qabul.svg', title: 'القبول', short: 'أعمال القبول والألفة والمودة', price: 14.9 },
];

export default function ServicesPage() {
  const [selected, setSelected] = useState(services[0]);
  const [name, setName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [relationship, setRelationship] = useState('زوج/زوجة');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState('');

  const valid = name.trim().length >= 2 && motherName.trim().length >= 2 && birthDate.length > 0 && relationship.length > 0 && !isCheckingOut;

  const handleCheckout = async () => {
    if (!valid) return;
    setError('');
    setIsCheckingOut(true);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selected.id,
          name: name.trim(),
          motherName: motherName.trim(),
          birthDate,
          relationship,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) {
        throw new Error(data.error || 'تعذر بدء عملية الدفع.');
      }

      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر بدء عملية الدفع.');
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
      <div className="mb-8">
        <span className="text-xs font-bold occult-gold">السحر والطلاسم والنجوم</span>
        <h1 className="mt-2 text-3xl font-black occult-gold sm:text-4xl">اختر العمل</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <section className="space-y-3">
          {services.map((service) => (
            <button
              key={service.id}
              aria-pressed={selected.id === service.id}
              aria-label={`اختيار ${service.title} — ${service.price.toFixed(2)} يورو`}
              type="button"
              onClick={() => setSelected(service)}
              className={`w-full rounded-2xl border p-4 text-right transition ${
                selected.id === service.id
                  ? 'border-[#a51222]/70 bg-[#18070b] shadow-[0_0_30px_rgba(127,11,24,.12)]'
                  : 'border-[#3b151a] bg-[#090508] hover:border-[#7f0b18]/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18070b] text-xl text-[#d7c9b5]">
                  {service.icon.startsWith('/') ? <img src={service.icon} alt="" className="h-11 w-11 object-contain" /> : service.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold occult-gold">{service.title}</span>
                  <span className="mt-1 block truncate text-xs occult-gold-soft">{service.short}</span>
                </span>
                <span className="shrink-0 font-bold occult-red">{service.price.toFixed(2)} €</span>
              </div>
            </button>
          ))}
        </section>

        <section className="rounded-[1.75rem] border border-[#3b151a] bg-[#090508] p-6">
          <div className="flex items-center justify-between border-b border-[#3b151a] pb-5">
            <div>
              <p className="text-xs occult-gold-soft">العمل المختار</p>
              <h2 className="mt-1 font-black occult-gold">{selected.title}</h2>
            </div>
            <span className="text-xl font-black occult-red">{selected.price.toFixed(2)} €</span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-bold">اسم الشخص موضوع العمل</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-[#3b151a] bg-[#050306] px-4 py-3.5 outline-none focus:border-[#a51222]" placeholder="محمد" required />
            </div>

            <div>
              <label className="text-sm font-bold">اسم الأم للشخص موضوع العمل</label>
              <input value={motherName} onChange={(e) => setMotherName(e.target.value)} className="mt-2 w-full rounded-xl border border-[#3b151a] bg-[#050306] px-4 py-3.5 outline-none focus:border-[#a51222]" placeholder="فاطمة" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold">تاريخ ميلاد الشخص موضوع العمل</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-2 w-full rounded-xl border border-[#3b151a] bg-[#050306] px-4 py-3.5 outline-none focus:border-[#a51222]" required />
              </div>
              <div>
                <label className="text-sm font-bold">علاقتك بالشخص موضوع العمل</label>
                <select required value={relationship} onChange={(e) => setRelationship(e.target.value)} className="mt-2 w-full rounded-xl border border-[#3b151a] bg-[#050306] px-4 py-3.5 outline-none focus:border-[#a51222]">
                  <option>زوج/زوجة</option>
                  <option>خطيب/خطيبة</option>
                  <option>شريك عاطفي</option>
                  <option>شخص آخر</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-[#050306] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#756963]">المجموع</span>
              <strong className="occult-gold">{selected.price.toFixed(2)} €</strong>
            </div>
          </div>

          {error && (
            <div role="alert" className="mt-4 rounded-xl border border-[#7f0b18] bg-[#18070b] px-4 py-3 text-center text-xs leading-5 text-[#d8a8a8]">
              {error}
            </div>
          )}

          <button
            type="button"
            disabled={!valid}
            onClick={handleCheckout}
            aria-busy={isCheckingOut}
            className="mt-5 w-full rounded-xl occult-button px-5 py-4 font-black transition hover:bg-[#ad1224] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isCheckingOut ? 'جارٍ فتح صفحة الدفع…' : `الدفع الآمن — ${selected.price.toFixed(2)} €`}
          </button>

          <p className="mt-3 text-center text-[11px] leading-5 text-[#5f514c]">
            سيتم تحويلك إلى Stripe لإتمام الدفع بأمان. لا يتم تأكيد الطلب إلا بعد تأكيد الدفع.
          </p>
        </section>
      </div>
    </main>
  );
}
