import Link from 'next/link';

const services = [
  { icon: '❤️', title: 'المحبة والمودة', text: 'تجربة رمزية مخصصة تركز على مشاعر المودة والتقارب.', price: '19.90 €' },
  { icon: '🕊️', title: 'المصالحة والتقارب', text: 'ملف روحاني رمزي يساعدك على التعبير عن نيتك للمصالحة.', price: '24.90 €' },
  { icon: '💍', title: 'العلاقة الزوجية', text: 'تجربة مخصصة حول المودة والحوار والنية الطيبة داخل العلاقة.', price: '29.90 €' },
  { icon: '🌙', title: 'قراءة روحانية', text: 'قراءة رمزية شخصية مبنية على المعلومات التي تختار مشاركتها.', price: '14.90 €' },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[#3b151a]">
        <div className="absolute inset-0 ornament opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[#7f0b18]/40 bg-[#7f0b18]/20 px-4 py-2 text-sm text-[#d7c9b5]">
              ✦ منصة روحانية عربية رقمية
            </span>
            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              مساحة هادئة لـ
              <span className="block bg-gradient-to-l from-[#e2b8ad] via-[#c7a69b] to-[#8f0d1b] bg-clip-text text-transparent">
                الروح، النية والتأمل
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-[#bcaea4]">
              اختر تجربتك الروحانية، خصصها بالمعلومات التي ترغب في مشاركتها، ثم احصل على ملف رقمي أنيق بصيغة PDF.
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
              المحتوى روحاني ورمزي ولا يضمن تغيير إرادة أو مشاعر شخص آخر.
            </p>
          </div>

          <div className="mt-16 grid max-w-4xl grid-cols-2 gap-4 lg:absolute lg:left-8 lg:top-28 lg:mt-0 lg:w-[430px]">
            {['🌙 النية', '✨ الرموز', '🪬 التأمل', '📜 ملف PDF'].map((item) => (
              <div key={item} className="rounded-3xl border border-[#3b151a] occult-card p-7 text-center backdrop-blur">
                <div className="text-3xl">{item.split(' ')[0]}</div>
                <div className="mt-3 font-semibold text-[#d7c9b5]">{item.slice(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold occult-red">خدمات مختارة</span>
            <h2 className="mt-2 text-3xl font-black">اختر تجربتك</h2>
          </div>
          <Link href="/services" className="text-sm font-bold occult-red hover:text-[#d7c9b5]">عرض جميع الخدمات ←</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link key={service.title} href="/services" className="group rounded-3xl border border-[#3b151a] occult-card p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7f0b18]/50 hover:occult-button/[0.06]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">{service.icon}</div>
              <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
              <p className="mt-3 min-h-14 text-sm leading-7 text-[#8f8177]">{service.text}</p>
              <div className="mt-5 font-bold occult-red">{service.price}</div>
            </Link>
          ))}
        </div>
      </section>

      <section id="how" className="border-y border-[#3b151a] bg-[#10070a]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-[#b69a8c]">بسيطة وواضحة</span>
            <h2 className="mt-2 text-3xl font-black">كيف تعمل روحاني؟</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ['01', 'اختر الخدمة', 'اختر التجربة التي تناسب هدفك وحدد الملف الذي تريد الحصول عليه.'],
              ['02', 'خصص طلبك', 'أدخل الحد الأدنى من المعلومات اللازمة لتخصيص التجربة.'],
              ['03', 'احصل على ملفك', 'بعد إتمام الدفع، يصبح ملفك الرقمي متاحًا للتنزيل من حسابك.'],
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

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="rounded-[2rem] border border-[#7f0b18]/35 bg-gradient-to-br from-[#7f0b18]/14 to-[#26070d]/20 p-10">
          <div className="text-4xl">✦</div>
          <h2 className="mt-4 text-3xl font-black">ابدأ تجربتك الآن</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-[#8f8177]">واجهة عربية بالكامل، طلبات رقمية، وملفات PDF مخصصة في مكان واحد.</p>
          <Link href="/services" className="mt-7 inline-flex rounded-2xl bg-white px-7 py-4 font-bold text-[#12070a] hover:bg-slate-100">
            اختيار خدمة
          </Link>
        </div>
      </section>
    </div>
  );
}