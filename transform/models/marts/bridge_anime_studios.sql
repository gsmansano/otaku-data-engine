with anime_unnested as (
    -- unnest the anime studios so we can connect each anime to all their studios
    select
        anime_id,
        unnest(string_to_array(studios, ', ')) as studio_name
    from {{ ref('stg_anime')}}
    where studios is not null
),

final as (
    -- we just swap our studio id for the studio name in the table
    select
        a.anime_id,
        s.studio_id
    from anime_unnested a
    inner join {{ref('dim_studios')}} s
        on a.studio_name = s.studio_name
)

select * from final