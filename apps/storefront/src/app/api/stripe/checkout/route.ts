import { NextResponse } from 'next/server';
import { createCustomer, createOrder, isSupabaseConfigured, updateOrderById } from '../../../../lib/supabase-admin';

export const runtime = 'nodejs';

const SERVICES: Record<string, { priceId: string; name: string; amountCents: number }> = {
  love: { priceId: 'price_1UL6j2C2PSFH6OVyIwc4tMUQ', name: 'المحبة والعطف والتهييج', amountCents: 1990 },
  reconcile: { priceId: 'price_1UL6j6C2PSFH6OVykKlq6fHu', name: 'الوصال والتقريب', amountCents: 2490 },
  marriage: { priceId: 'price_1UL6j9C2PSFH6OVyRnxpTRZG', name: 'الألفة والمودة', amountCents: 2990 },
  qabul: { priceId: 'price_1UL6jCC2PSFH6OVyH66mtJQF', name: 'القبول', amountCents: 1490 },
};

const clean = (value: unknown, max = 120) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: 'الدفع غير متاح حالياً.' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const serviceId = clean(body?.serviceId, 32);
    const name = clean(body?.name, 80);
    const motherName = clean(body?.motherName, 80);
    const otherName = clean(body?.otherName, 80);
    const birthDate = clean(body?.birthDate, 20);
    const relationship = clean(body?.relationship, 40);
    const service = SERVICES[serviceId];

    if (!service || name.length < 2 || motherName.length < 2 || !birthDate || !relationship) {
      return NextResponse.json({ error: 'يرجى التحقق من البيانات.' }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً.' }, { status: 503 });
    }

    const customerId = await createCustomer({
      firstName: name,
      motherName,
      otherName,
      birthDate,
      relationship,
    });

    const orderId = await createOrder({
      customerId,
      serviceId,
      amountCents: service.amountCents,
      currency: 'eur',
    });

    const origin = new URL(request.url).origin;
    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('line_items[0][price]', service.priceId);
    params.set('line_items[0][quantity]', '1');
    params.set('success_url', origin + '/payment/success?session_id={CHECKOUT_SESSION_ID}');
    params.set('cancel_url', origin + '/services');
    params.set('locale', 'ar');
    params.set('billing_address_collection', 'auto');
    params.set('metadata[order_id]', orderId);
    params.set('metadata[service_id]', serviceId);
    params.set('metadata[service_name]', service.name);
    params.set('metadata[name]', name);
    if (motherName) params.set('metadata[mother_name]', motherName);
    if (birthDate) params.set('metadata[birth_date]', birthDate);
    if (relationship) params.set('metadata[relationship]', relationship);

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      cache: 'no-store',
    });

    const data = await response.json();
    if (!response.ok || !data?.url) {
      console.error('Stripe checkout error', data?.error?.type, data?.error?.message);
      return NextResponse.json({ error: 'تعذر بدء عملية الدفع.' }, { status: 502 });
    }

    await updateOrderById(orderId, {
      stripe_checkout_session_id: data.id,
    });

    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error('Checkout route error', error);
    return NextResponse.json({ error: 'تعذر بدء عملية الدفع.' }, { status: 500 });
  }
}
