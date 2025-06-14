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
                    viewpoints_count,
                    photos
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
                    0,
                    '[]'::jsonb
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
                    viewpoints_count,
                    photos
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
                    0,
                    '[]'::jsonb
                );
            end if;
        end if;

        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' then
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
                viewpoints_count, 
                photos
            )
            values (
                new.id, 
                new.raw_user_meta_data ->> 'name', 
                new.raw_user_meta_data ->> 'preferred_username' || substr(md5(random()::text), 1, 5), 
                new.email, 
                new.encrypted_password, 
                0, 
                0, 
                0, 
                0, 
                0, 
                jsonb_build_array(new.raw_user_meta_data ->> 'avatar_url')
            );
        end if;

        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'github' then
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
                viewpoints_count, 
                photos
            )
            values (
                new.id, 
                new.raw_user_meta_data ->> 'full_name', 
                new.raw_user_meta_data ->> 'user_name' || substr(md5(random()::text), 1, 5), 
                new.email, 
                new.encrypted_password, 
                0, 
                0, 
                0, 
                0, 
                0, 
                jsonb_build_array(new.raw_user_meta_data ->> 'avatar_url')
            );
        end if;
    end if;
    return new;
end;
$$;

create trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();