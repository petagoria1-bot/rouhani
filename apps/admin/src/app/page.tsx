const stats = [
  ['طلبات اليوم', '24', '+12%'],
  ['بانتظار المعالجة', '8', ''],
  ['ملفات PDF جاهزة', '17', ''],
  ['إيرادات الشهر', '1,284 €', '+18%'],
];

const recent = [
  ['#RH-1048', 'المحبة والمودة', 'مريم', '19.90 €', 'جديد'],
  ['#RH-1047', 'المصالحة والتقارب', 'أحمد', '24.90 €', 'قيد المعالجة'],
  ['#RH-1046', 'العلاقة الزوجية', 'سارة', '29.90 €', 'PDF جاهز'],
  ['#RH-1045', 'قراءة روحانية', 'يوسف', '14.90 €', 'مكتمل'],
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0b0915] p-6 text-white lg:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-7 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-bold text-violet-300">روحاني • الإدارة</span>
            <h1 className="mt-2 text-3xl font-black">لوحة التحكم</h1>
            <p className="mt-2 text-sm text-slate-400">إدارة الخدمات والطلبات والملفات الرقمية.</p>
          </div>
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10">تحديث البيانات</button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value, trend]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="text-sm text-slate-500">{label}</div>
              <div className="mt-3 text-2xl font-black">{value}</div>
              {trend && <div className="mt-2 text-xs font-bold text-emerald-300">{trend}</div>}
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="border-b border-white/10 p-5">
              <h2 className="font-bold">آخر الطلبات</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-white/[0.03] text-slate-500">
                  <tr><th className="px-5 py-4">الطلب</th><th>الخدمة</th><th>العميل</th><th>المبلغ</th><th className="px-5">الحالة</th></tr>
                </thead>
                <tbody>
                  {recent.map(([id, service, customer, amount, status]) => (
                    <tr key={id} className="border-t border-white/5">
                      <td className="px-5 py-4 font-bold">{id}</td><td>{service}</td><td>{customer}</td><td>{amount}</td><td className="px-5"><span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-200">{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-6">
            <h2 className="font-bold">اختصارات الإدارة</h2>
            <div className="mt-5 space-y-3">
              {['إدارة الخدمات', 'الطلبات المدفوعة', 'مولّد ملفات PDF', 'العملاء', 'إعدادات الدفع'].map((item) => (
                <button key={item} className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-right text-sm font-bold hover:bg-white/5">{item}</button>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}