create extension if not exists pgcrypto;

create table if not exists public.services (
  id text primary key,
  name_ar text not null,
  price_cents integer not null check (price_cents > 0),
  currency text not null default 'eur',
  stripe_price_id text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  other_name text,
  birth_date date,
  relationship text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id),
  service_id text not null references public.services(id),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'eur',
  payment_status text not null default 'pending',
  order_status text not null default 'pending',
  pdf_status text not null default 'pending',
  pdf_storage_path text,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_payment_status on public.orders(payment_status);
create index if not exists idx_orders_order_status on public.orders(order_status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  event_type text not null,
  processed_at timestamptz not null default now()
);

insert into public.services (id, name_ar, price_cents, currency, stripe_price_id)
values
  ('love', 'المحبة والعطف والتهييج', 1990, 'eur', 'price_1UL6j2C2PSFH6OVyIwc4tMUQ'),
  ('reconcile', 'الوصال والتقريب', 2490, 'eur', 'price_1UL6j6C2PSFH6OVykKlq6fHu'),
  ('marriage', 'الألفة والمودة', 2990, 'eur', 'price_1UL6j9C2PSFH6OVyRnxpTRZG'),
  ('qabul', 'القبول', 1490, 'eur', 'price_1UL6jCC2PSFH6OVyH66mtJQF')
on conflict (id) do update set
  name_ar = excluded.name_ar,
  price_cents = excluded.price_cents,
  currency = excluded.currency,
  stripe_price_id = excluded.stripe_price_id,
  active = true;

alter table public.services enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.webhook_events enable row level security;

-- The storefront currently uses server-side Supabase access with the service-role key.
-- No public/anon policies are created, so customer/order data is not exposed to browsers.
