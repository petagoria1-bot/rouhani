import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

export const runtime = 'nodejs';

function verifyStripeSignature(payload: string, signature: string, secret: string) {
  const parts = signature.split(',').map((part) => part.split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);

  if (!timestamp || signatures.length === 0) return false;
  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac('sha256', secret).update(signedPayload).digest('hex');

  return signatures.some((candidate) => {
    try {
      const a = Buffer.from(expected, 'utf8');
      const b = Buffer.from(candidate, 'utf8');
      return a.length === b.length && timingSafeEqual(a, b);
    } catch {
      return false;
    }
  });
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook non configuré.' }, { status: 503 });
  }

  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !verifyStripeSignature(payload, signature, secret)) {
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 });
  }

  try {
    const event = JSON.parse(payload);
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        console.log('Stripe payment confirmed', {
          eventId: event.id,
          sessionId: event.data?.object?.id,
          paymentStatus: event.data?.object?.payment_status,
          serviceId: event.data?.object?.metadata?.service_id,
        });
        break;
      case 'checkout.session.async_payment_failed':
      case 'checkout.session.expired':
        console.log('Stripe checkout not completed', {
          eventId: event.id,
          sessionId: event.data?.object?.id,
          type: event.type,
        });
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error', error);
    return NextResponse.json({ error: 'Événement invalide.' }, { status: 400 });
  }
}
