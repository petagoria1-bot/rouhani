'use client';

import { useMemo, useState } from 'react';

const services = [
  { id: 'love', icon: '❤️', title: 'المحبة والمودة', description: 'ملف رمزي مخصص للتأمل في المحبة والمودة والتقارب.', price: 19.9 },
  { id: 'reconcile', icon: '🕊️', title: 'المصالحة والتقارب', description: 'تجربة رمزية حول نية المصالحة وفتح مساحة للحوار.', price: 24.9 },
  { id: 'marriage', icon: '💍', title: 'العلاقة الزوجية', description: 'ملف مخصص يركز على المودة والنية الطيبة داخل العلاقة.', price: 29.9 },
  { id: 'reading', icon: '🌙', title: 'قراءة روحانية', description: 'قراءة رمزية شخصية وفق المعلومات التي تختار مشاركتها.', price: 14.9 },
];

export default function ServicesPage() {
  const [selected, setSelected] = useState(services[0]);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [relationship, setRelationship] = useState('زوج/زوجة');
  const [submitted, setSubmitted] = useState(false);

  const valid = useMemo(() => name.trim().length >= 2, [name]);

  if (submitted) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-16 text-center">
        <div className="w-full rounded-[2rem] border border-emerald-300/15 bg-emerald-500/5 p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/10 text-4xl">✓</div>
          <h1 className="mt-6 text-3xl font-black">تم تجهيز طلبك</h1>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-400">
            هذه نسخة تجريبية من تدفق الطلب. الخطوة التالية هي ربط الدفع الحقيقي ثم إنشاء ملف PDF بعد تأكيد الدفع عبر Webhook.
          </p>
          <button onClick={() => { setSubmitted(false); setStep(1); }} className="mt-8 rounded-2xl bg-violet-500 px-7 py-4 font-bold hover:bg-violet-400">
            إنشاء طلب جديد
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="mb-10">
        <span className="text-sm font-bold text-violet-300">الخدمات الروحانية</span>
        <h1 className="mt-2 text-4xl font-black">خصص تجربتك</h1>
        <p className="mt-4 max-w-2xl leading-8 text-slate-400">اختر خدمة، ثم أدخل المعلومات الضرورية فقط. يمكنك تعديل اختيارك قبل الدفع.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-3">
          {services.map((service) => (
            <button key={service.id} onClick={() => setSelected(service)} className={`w-full rounded-3xl border p-5 text-right transition ${selected.id === service.id ? 'border-violet-400/50 bg-violet-500/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'}`}>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl">{service.icon}</span>
                <span className="flex-1">
                  <span className="block font-bold">{service.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-400">{service.description}</span>
                </span>
                <span className="font-bold text-violet-300">{service.price.toFixed(2)} €</span>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            {[1, 2, 3].map((n) => <span key={n} className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= n ? 'bg-violet-500 text-white' : 'bg-white/10'}`}>{n}</span>)}
          </div>

          {step === 1 && (
            <div className="mt-8">
              <h2 className="text-2xl font-black">بيانات الطلب</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">نستخدم هذه البيانات فقط لتخصيص الملف. لا تدخل معلومات حساسة.</p>
              <label className="mt-7 block text-sm font-bold">اسمك الأول</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none focus:border-violet-400" placeholder="مثال: محمد" />
              <label className="mt-5 block text-sm font-bold">اسم الطرف الآخر الأول <span className="font-normal text-slate-500">(اختياري)</span></label>
              <input value={otherName} onChange={(e) => setOtherName(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none focus:border-violet-400" placeholder="مثال: سارة" />
              <button disabled={!valid} onClick={() => setStep(2)} className="mt-7 w-full rounded-2xl bg-violet-500 px-5 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-violet-400">
                متابعة
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8">
              <h2 className="text-2xl font-black">معلومات إضافية</h2>
              <label className="mt-7 block text-sm font-bold">تاريخ الميلاد <span className="font-normal text-slate-500">(اختياري)</span></label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none focus:border-violet-400" />
              <label className="mt-5 block text-sm font-bold">نوع العلاقة</label>
              <select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 outline-none focus:border-violet-400">
                <option>زوج/زوجة</option>
                <option>خطيب/خطيبة</option>
                <option>شريك عاطفي</option>
                <option>شخص أرغب في التقارب معه</option>
              </select>
              <div className="mt-7 flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 rounded-2xl border border-white/10 px-5 py-4 font-bold">رجوع</button>
                <button onClick={() => setStep(3)} className="flex-1 rounded-2xl bg-violet-500 px-5 py-4 font-bold hover:bg-violet-400">مراجعة</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-8">
              <h2 className="text-2xl font-black">مراجعة الطلب</h2>
              <div className="mt-6 space-y-4 rounded-2xl bg-black/20 p-5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">الخدمة</span><strong>{selected.title}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">الاسم</span><strong>{name}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">الطرف الآخر</span><strong>{otherName || '—'}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">العلاقة</span><strong>{relationship}</strong></div>
                <div className="border-t border-white/10 pt-4 flex justify-between text-base"><span>المبلغ</span><strong className="text-violet-300">{selected.price.toFixed(2)} €</strong></div>
              </div>
              <div className="mt-5 rounded-2xl border border-amber-300/10 bg-amber-300/5 p-4 text-xs leading-6 text-amber-100/70">
                الخدمة رمزية وروحانية ولا تمثل ضمانًا لنتيجة عاطفية أو قدرة على التحكم في إرادة شخص آخر.
              </div>
              <div className="mt-7 flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 rounded-2xl border border-white/10 px-5 py-4 font-bold">تعديل</button>
                <button onClick={() => setSubmitted(true)} className="flex-1 rounded-2xl bg-gradient-to-l from-violet-500 to-fuchsia-500 px-5 py-4 font-bold">متابعة للدفع</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}