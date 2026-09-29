import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

export const runtime = 'nodejs';

function verifyStripeSignature(payload: string, signature: string, secret: string) {
  const timestampPart = signature.split(',').find((part) => part.startsWith('t='));
  const timestamp = timestampPart?.slice(2);
  const signatures = signature
    .split(',')
    .filter((part) => part.startsWith('v1='))
    .map((part) => part.slice(3));

  if (!timestamp || signatures.length === 0) return false;

  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) {
    return false;
  }

  const expected = createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest();

  return signatures.some((candidate) => {
    try {
      const received = Buffer.from(candidate, 'hex');
      return received.length === expected.length && timingSafeEqual(expected, received);
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
    const session = event?.data?.object;

    if (!event?.id || !event?.type || !session?.id) {
      return NextResponse.json({ error: 'Événement Stripe invalide.' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const paymentStatus = session.payment_status;
        if (paymentStatus === 'paid') {
          console.log('STRIPE_PAYMENT_CONFIRMED', {
            eventId: event.id,
            sessionId: session.id,
            paymentIntent: session.payment_intent ?? null,
            serviceId: session.metadata?.service_id ?? null,
            serviceName: session.metadata?.service_name ?? null,
            customerName: session.metadata?.name ?? null,
          });
        }
        break;
      }

      case 'checkout.session.async_payment_failed':
      case 'checkout.session.expired':
        console.log('STRIPE_PAYMENT_NOT_COMPLETED', {
          eventId: event.id,
          sessionId: session.id,
          serviceId: session.metadata?.service_id ?? null,
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
