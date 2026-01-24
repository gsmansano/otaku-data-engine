

with anime_themes_unnested as (
    select
        anime_id,
        unnest(string_to_array(coalesce(themes, 'Unknown'), ', ')) as theme_name
    from {{ ref('stg_anime') }}
),

final as (
    select
        at.anime_id,
        t.theme_id
    from anime_themes_unnested at
    inner join {{ ref('dim_themes') }} t 
        on at.theme_name = t.theme_name
)

select * from final