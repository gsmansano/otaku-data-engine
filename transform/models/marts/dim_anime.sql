-- creating our anime dimension.

with source as (
    select * from {{ ref('stg_anime') }}
),

final as (
    select
        anime_id,
        title,
        media_type,
        airing_status,
        anime_source,
        release_year,
        episodes,
        season,
        rating,
        synopsis,
        image_url
    from source
)

select * from final