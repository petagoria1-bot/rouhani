import Link from 'next/link';

const services = [
  { icon: '⛧', title: 'أعمال المحبة والعطف والتهييج', text: 'باب من أبواب السحر والطلاسم كما ترد تسمياته في المخطوطات التراثية.', price: '19.90 €' },
  { icon: '◈', title: 'أعمال الوصال والتقريب', text: 'عمل من أبواب الوصال والتقريب الواردة في تقاليد الطلاسم القديمة.', price: '24.90 €' },
  { icon: '✦', title: 'أعمال الألفة والمودة', text: 'ملف مخصص مستوحى من أبواب الألفة والمودة والقبول في المصادر التراثية.', price: '29.90 €' },
  { icon: '☾', title: 'الأوفاق والعزائم والطلاسم', text: 'استكشاف لأبواب الأوفاق والعزائم والطلاسم والنجوم في التراث السحري.', price: '14.90 €' },
];

export default function Home() {
  return (
    <div className="horror-vignette">
      <section className="relative overflow-hidden border-b border-[#3b151a]">
        <div className="absolute inset-0 ornament opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl relative z-10">
            <span className="inline-flex rounded-full border border-[#7f0b18]/50 bg-black/50 px-4 py-2 text-sm text-[#d7c9b5] tracking-wide">
              ⛧ السحر والطلاسم والنجوم
            </span>
            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              لا تدخل هنا
              <span className="block bg-gradient-to-l from-[#e2b8ad] via-[#c7a69b] to-[#8f0d1b] bg-clip-text text-transparent">
                السحر والطلاسم<br className="hidden sm:block" /> والأوفاق والعزائم
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-[#bcaea4]">
              استكشف أبواب السحر والطلاسم والأوفاق والعزائم كما ترد في المخطوطات التراثية، واختر العمل الذي تريد طلبه ثم احصل على ملفك بصيغة PDF.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/services" className="rounded-2xl occult-button px-7 py-4 font-bold shadow-lg shadow-[#4d0710]/40 transition hover:bg-[#ad1224]">
                اكتشف الخدمات
              </Link>
              <a href="#how" className="rounded-2xl border border-white/15 bg-[#18090d] px-7 py-4 font-bold text-[#d7c9b5] transition hover:bg-white/10">
                كيف تعمل المنصة؟
              </a>
            </div>
            <p className="mt-5 text-xs text-[#756963]">
              أعمال رقمية مستوحاة من مصطلحات وأبواب المصادر التراثية.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8 lg:absolute lg:left-8 lg:top-28 lg:mt-0 lg:w-[430px]">
            {[
              ['/icons/sihr.svg', 'السحر'],
              ['/icons/talismans.svg', 'الطلاسم'],
              ['/icons/awfaq.svg', 'الأوفاق'],
              ['☾', 'النجوم'],
            ].map(([icon, label]) => (
              <div key={label} className="rounded-3xl border border-[#3b151a] occult-card horror-card p-7 text-center backdrop-blur">
                <div className="flex h-16 items-center justify-center text-3xl">
                  {icon.startsWith('/') ? <img src={icon} alt="" className="h-16 w-16 object-contain" /> : icon}
                </div>
                <div className="mt-3 font-semibold text-[#d7c9b5]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold occult-red">الأعمال</span>
            <h2 className="mt-2 text-3xl font-black">اختر العمل</h2>
          </div>
          <Link href="/services" className="text-sm font-bold occult-red hover:text-[#d7c9b5]">عرض جميع الأعمال ←</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link key={service.title} href="/services" className="group rounded-3xl border border-[#3b151a] occult-card horror-card p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7f0b18]/50 hover:occult-button/[0.06]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                {service.icon.startsWith('/') ? <img src={service.icon} alt="" className="h-11 w-11 object-contain" /> : service.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
              <p className="mt-3 min-h-14 text-sm leading-7 text-[#8f8177]">{service.text}</p>
              <div className="mt-5 font-bold occult-red">{service.price}</div>
            </Link>
          ))}
        </div>
      </section>

      <section id="how" className="border-y border-[#3b151a] bg-[#070407] horror-vignette">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-[#b69a8c]">من المخطوطات إلى الطلب</span>
            <h2 className="mt-2 text-3xl font-black">اطلب عملك</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ['01', 'اختر الخدمة', 'اختر العمل المناسب.'],
              ['02', 'خصص طلبك', 'أدخل بياناتك المطلوبة.'],
              ['03', 'احصل على ملفك', 'ادفع ثم استلم ملفك الرقمي.'],
            ].map(([n, title, text]) => (
              <div key={n} className="rounded-3xl border border-[#3b151a] p-7">
                <span className="text-sm font-black occult-red">{n}</span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-8 text-[#8f8177]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="rounded-[2rem] border border-[#7f0b18]/40 bg-[#090407] p-10 occult-glow horror-card">
          <div className="mx-auto horror-seal" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black">هل تجرؤ على فتح المخطوطة؟</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-[#8f8177]">اختر العمل وابدأ الطلب مباشرة.</p>
          <Link href="/services" className="mt-7 inline-flex rounded-2xl bg-white px-7 py-4 font-bold text-[#12070a] hover:bg-slate-100">
            اختيار عمل
          </Link>
        </div>
      </section>
    </div>
  );
}