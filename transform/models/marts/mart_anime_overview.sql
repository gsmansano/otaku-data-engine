{{ config(materialized='table') }}

with anime as (
    select * from {{ ref('dim_anime') }}
),
stats as (
    select * from {{ ref('fct_anime_stats') }}
),

-- as i need each anime to be a single row, this overview will "undo" the genre, studio and theme separations

studio_agg as (
    select 
        bas.anime_id,
        string_agg(s.studio_name, ', ') as studios
    from {{ ref('bridge_anime_studios') }} bas
    join {{ ref('dim_studios') }} s on bas.studio_id = s.studio_id
    group by 1
),

genre_agg as (
    select
        bg.anime_id,
        string_agg(g.genre_name, ', ') as genres
    from {{ ref('bridge_anime_genres') }} bg
    join {{ ref('dim_genres') }} g on bg.genre_id = g.genre_id
    group by 1
),

theme_agg as (
    select 
        bt.anime_id,
        string_agg(t.theme_name, ', ') as themes
    from {{ ref('bridge_anime_themes') }} bt
    join {{ ref('dim_themes') }} t on bt.theme_id = t.theme_id
    group by 1
)

select
    a.anime_id,
    a.title,
    a.media_type,
    a.release_year,
    a.airing_status,
    a.rating,
    s.score,
    s.rank,
    s.scored_by,
    s.popularity,
    s.score_popularity_ratio,
    s.members,               
    s.favorites,
    st.studios,
    g.genres,
    t.themes
from anime a
left join stats s on a.anime_id = s.anime_id
left join studio_agg st on a.anime_id = st.anime_id
left join genre_agg g on a.anime_id = g.anime_id
left join theme_agg t on a.anime_id = t.anime_id
where s.anime_id is not null 
order by s.rank asc