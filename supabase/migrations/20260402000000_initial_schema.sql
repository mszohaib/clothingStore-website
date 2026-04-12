-- Demo storefront — initial schema
-- Run in Supabase SQL Editor or via `supabase db push` after linking a project.

-- ---------------------------------------------------------------------------
-- PROFILES (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'App user profile; role admin unlocks dashboard API when verified by backend.';

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  brand text not null default '',
  price numeric(10, 2) not null check (price >= 0),
  size text not null default '',
  condition text not null default '',
  description text not null default '',
  image_url text not null default '',
  status text not null default 'available'
    check (status in ('available', 'sold', 'preorder')),
  badge text
    check (badge is null or badge in ('new', 'limited', 'sold_out')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_status_idx on public.products (status);
create index if not exists products_featured_idx on public.products (featured) where featured = true;
create index if not exists products_created_at_idx on public.products (created_at desc);

-- ---------------------------------------------------------------------------
-- ORDERS
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  items jsonb not null default '[]'::jsonb,
  total_amount numeric(10, 2) not null check (total_amount >= 0),
  payment_method text not null,
  order_status text not null default 'pending'
    check (order_status in ('pending', 'confirmed', 'shipped', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (order_status);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- Backend uses service_role and bypasses RLS. Policies protect direct anon/auth access.
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Profiles: users read/update own row (no role escalation via client)
create policy "Users can select own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Products: public catalog read
create policy "Anyone can read products"
  on public.products for select
  using (true);

-- Orders: optional direct client flows — only own rows. Guest / full checkout uses API + service_role (bypasses RLS).
create policy "Users can insert own order"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Users can select own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Admin mutations (insert/update/delete) go through Express with SUPABASE_SERVICE_ROLE_KEY.
