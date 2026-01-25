with anime as (
    select * from {{ ref('stg_anime') }}
),

final as (
    select
        anime_id,
        title,
        media_type,
        score,
        -- custom metric: Popularity vs Score ratio
        -- to identify "hidden gems" (high score, lower popularity)
        round(cast(score as numeric) / nullif(popularity, 0), 4) as score_popularity_ratio,
        rank,
        members,
        favorites
    from anime
    where score is not null
)

select * from final