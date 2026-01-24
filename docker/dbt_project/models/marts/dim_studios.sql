-- creating a studios specific table
-- this will handle the fact that ~8% of the anime are multi studio collabs
-- and will help to extract studio insights without creating problems with
-- repeated rows on a single table

with raw_studios as (
    select
        distinct unnest(string_to_array(studios, ', ')) as studio_name
        from {{ref('stg_anime')}}
        where studios is not null
),

final as (
    select
    -- im creating unique ids as a md5 hash based on the studio name
    md5(studio_name) as studio_id, studio_name
    from raw_studios
)

select * from final