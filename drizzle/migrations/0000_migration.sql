create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.grant_admin_for_allowed_email()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if new.email_confirmed_at is not null and lower(new.email) in ('yashipatel166@gmail.com') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end; $$;
create trigger on_auth_user_created_grant_admin after insert on auth.users
for each row execute function public.grant_admin_for_allowed_email();
create trigger on_auth_user_confirmed_grant_admin after update of email_confirmed_at on auth.users
for each row execute function public.grant_admin_for_allowed_email();

create table public.site_content (
  page text not null,
  key text not null,
  value text not null default '',
  updated_at timestamptz not null default now(),
  primary key (page, key)
);
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "Anyone reads content" on public.site_content for select to anon, authenticated using (true);
create policy "Admins insert content" on public.site_content for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update content" on public.site_content for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete content" on public.site_content for delete to authenticated using (public.has_role(auth.uid(), 'admin'));