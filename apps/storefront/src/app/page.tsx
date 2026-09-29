import Link from 'next/link';

const services = [
  { icon: '⛧', title: 'أعمال المحبة والعطف والتهييج', text: 'من الأبواب التي ترد في المصادر التراثية ضمن مباحث المحبة والمودة والعطف.', price: '19.90 €' },
  { icon: '◈', title: 'أعمال الوصال والتقريب', text: 'من المصطلحات المرتبطة بأبواب الوصال والتقريب في تقاليد الطلاسم والمخطوطات القديمة.', price: '24.90 €' },
  { icon: '✦', title: 'أعمال الألفة والمودة', text: 'عمل مستوحى من أبواب الألفة والمودة والقبول كما تظهر في المصادر التراثية.', price: '29.90 €' },
  { icon: '☾', title: 'الأوفاق والعزائم والطلاسم', text: 'أعمال رقمية مستوحاة من تقاليد الأوفاق والطلاسم والرموز الفلكية الواردة في المخطوطات.', price: '14.90 €' },
];

export default function Home() {
  return (
    <div className="horror-vignette">
      <section className="relative overflow-hidden border-b border-[#3b151a]">
        <div className="absolute inset-0 ornament opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl relative z-10">
            <span className="inline-flex rounded-full border border-[#7f0b18]/50 bg-black/50 px-4 py-2 text-sm text-[#d7c9b5] tracking-wide">
              ⛧ مخطوطات روحانية من التراث العربي
            </span>
            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              السحر والطلاسم والأوفاق والعزائم والنجوم
              <span className="block bg-gradient-to-l from-[#e2b8ad] via-[#c7a69b] to-[#8f0d1b] bg-clip-text text-transparent">
                أعمال مستوحاة من المخطوطات العربية
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-[#bcaea4]">
              منصة رقمية تستلهم أسماء الأبواب والمصطلحات الواردة في كتب التراث الروحاني، وتقدم أعمالًا رقمية مخصصة في مجالات المحبة والمودة والألفة والوصال والتقريب، ضمن تجربة مستوحاة من أجواء المخطوطات القديمة.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/services" className="rounded-2xl occult-button px-7 py-4 font-bold shadow-lg shadow-[#4d0710]/40 transition hover:bg-[#ad1224]">
                استعرض الأعمال
              </Link>
              <a href="#how" className="rounded-2xl border border-white/15 bg-[#18090d] px-7 py-4 font-bold text-[#d7c9b5] transition hover:bg-white/10">
                تعرّف على طريقة الطلب
              </a>
            </div>
            <p className="mt-5 text-xs text-[#756963]">
أعمال رقمية مستوحاة من مصطلحات وأبواب المصادر التراثية.
            </p>
          </div>

          <div className="mt-16 grid w-full grid-cols-2 gap-4 sm:gap-5 lg:absolute lg:left-8 lg:top-28 lg:mt-0 lg:w-[430px] lg:grid-cols-2">
            {[
              ['/icons/sihr.svg', 'السحر'],
              ['/icons/talismans.svg', 'الطلاسم'],
              ['/icons/awfaq.svg', 'الأوفاق'],
              ['/icons/azaim.svg', 'العزائم'],
              ['/icons/mahabbah.svg', 'المحبة'],
              ['/icons/stars.svg', 'النجوم'],
            ].map(([icon, label]) => (
              <div key={label} className="rounded-3xl border border-[#3b151a] occult-card horror-card p-5 text-center backdrop-blur">
                <div className="flex h-20 items-center justify-center text-3xl">
                  {icon.startsWith('/') ? <img src={icon} alt="" className="h-20 w-20 object-contain" /> : icon}
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
            <span className="text-sm font-bold occult-red">الأعمال الروحانية</span>
            <h2 className="mt-2 text-3xl font-black">اختر المجال الذي ترغب في إعداد عمل مخصص له</h2>
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
            <h2 className="mt-2 text-3xl font-black">كيف يتم إعداد العمل؟</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ['01', 'اختر العمل', 'حدد نوع العمل الذي ترغب في طلبه.'],
              ['02', 'أدخل بيانات الشخص موضوع العمل', 'أدخل المعلومات المطلوبة لإعداد العمل بصورة مخصصة.'],
              ['03', 'أكمل الطلب', 'أتمم عملية الدفع، ثم تتم معالجة طلبك وإعداد ملفك الرقمي.'],
            ].map(([n, title, text]) => (
              <div key={n} className="rounded-3xl border border-[#3b151a] p-7">
                <span className="text-sm font-black occult-red">{n}</span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-8 text-[#8f8177]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl border border-[#3b151a] p-7">
            <span className="text-sm font-black occult-red">04</span>
            <h3 className="mt-5 text-xl font-bold">استلم ملفك</h3>
            <p className="mt-3 leading-8 text-[#8f8177]">تحصل على العمل بصيغة PDF الرقمية.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="rounded-[2rem] border border-[#7f0b18]/40 bg-[#090407] p-10 occult-glow horror-card">
          <div className="mx-auto horror-seal" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black">من صفحات المخطوطات القديمة إلى تجربة رقمية معاصرة</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-[#8f8177]">استكشف الأعمال المستوحاة من أبواب التراث الروحاني واختر العمل المناسب لطلبك.</p>
          <Link href="/services" className="mt-7 inline-flex rounded-2xl bg-white px-7 py-4 font-bold text-[#12070a] hover:bg-slate-100">
            استعرض الأعمال
          </Link>
        </div>
      </section>
    </div>
  );
}