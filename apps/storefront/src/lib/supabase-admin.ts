const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && serviceRoleKey);
}

export async function supabaseRequest<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase is not configured');
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });

  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const detail =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message?: unknown }).message)
        : response.statusText;
    throw new Error(`Supabase request failed: ${response.status} ${detail}`);
  }

  return data as T;
}

export async function createCustomer(input: {
  firstName: string;
  otherName?: string;
  birthDate?: string;
  relationship?: string;
}) {
  const rows = await supabaseRequest<Array<{ id: string }>>('customers', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      first_name: input.firstName,
      other_name: input.otherName || null,
      birth_date: input.birthDate || null,
      relationship: input.relationship || null,
    }),
  });

  if (!rows?.[0]?.id) throw new Error('Supabase customer creation failed');
  return rows[0].id;
}

export async function createOrder(input: {
  customerId: string;
  serviceId: string;
  amountCents: number;
  currency: string;
}) {
  const rows = await supabaseRequest<Array<{ id: string }>>('orders', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      customer_id: input.customerId,
      service_id: input.serviceId,
      amount_cents: input.amountCents,
      currency: input.currency,
      payment_status: 'pending',
      order_status: 'pending',
      pdf_status: 'pending',
    }),
  });

  if (!rows?.[0]?.id) throw new Error('Supabase order creation failed');
  return rows[0].id;
}

export async function updateOrderBySession(
  sessionId: string,
  patch: Record<string, unknown>,
) {
  return supabaseRequest('orders?stripe_checkout_session_id=eq.' + encodeURIComponent(sessionId), {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      ...patch,
      updated_at: new Date().toISOString(),
    }),
  });
}

export async function registerWebhookEvent(eventId: string, eventType: string) {
  try {
    await supabaseRequest('webhook_events', {
      method: 'POST',
      headers: {
        Prefer: 'return=minimal',
        'Accept-Profile': 'public',
      },
      body: JSON.stringify({
        stripe_event_id: eventId,
        event_type: eventType,
      }),
    });
    return true;
  } catch (error) {
    if (String(error).includes('duplicate key')) return false;
    throw error;
  }
}
