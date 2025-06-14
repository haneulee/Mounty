create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if new.raw_app_meta_data is not null then
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
            if new.raw_user_meta_data ? 'name' and new.raw_user_meta_data ? 'username' then
                insert into public.profiles (
                    profile_id,
                    name,
                    username,
                    email,
                    password,
                    followers_count,
                    following_count,
                    posts_count,
                    trails_count,
                    viewpoints_count
                )
                values (
                    new.id,
                    new.raw_user_meta_data ->> 'name',
                    new.raw_user_meta_data ->> 'username',
                    new.email,
                    new.encrypted_password,
                    0,
                    0,
                    0,
                    0,
                    0
                );
            else
                insert into public.profiles (
                    profile_id,
                    name,
                    username,
                    email,
                    password,
                    followers_count,
                    following_count,
                    posts_count,
                    trails_count,
                    viewpoints_count
                )
                values (
                    new.id,
                    'Anonymous',
                    'user_' || substr(md5(random()::text), 1, 8),
                    new.email,
                    new.encrypted_password,
                    0,
                    0,
                    0,
                    0,
                    0
                );
            end if;
        end if;
    end if;
    return new;
end;
$$;

create trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();