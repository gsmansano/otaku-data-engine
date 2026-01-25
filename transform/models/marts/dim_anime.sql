-- creating our anime dimension.

with source as (
    select * from {{ ref('stg_anime') }}
),

final as (
    select
        anime_id,
        title,
        media_type,
        status,
        anime_source,
        release_year,
        episodes
    from source
)

select * from final