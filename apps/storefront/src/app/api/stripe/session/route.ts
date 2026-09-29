import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: 'الدفع غير متاح حالياً.' }, { status: 503 });
  }

  const sessionId = new URL(request.url).searchParams.get('session_id');
  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    return NextResponse.json({ error: 'جلسة دفع غير صالحة.' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: { Authorization: `Bearer ${secret}` },
        cache: 'no-store',
      },
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: 'تعذر التحقق من الدفع.' }, { status: 502 });
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
      paymentStatus: data.payment_status,
      serviceName: data.metadata?.service_name ?? null,
    });
  } catch (error) {
    console.error('Stripe session verification error', error);
    return NextResponse.json({ error: 'تعذر التحقق من الدفع.' }, { status: 500 });
  }
}
