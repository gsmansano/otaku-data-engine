-- this will create a relational table between animes and their genres.

with anime_genres_unnested as (
    select  
        anime_id,
        unnest(string_to_array(genres, ', ')) as genre_name
    from {{ref('stg_anime')}}
    where genres is not null
),

final as (
    select
        ag.anime_id,
        g.genre_id
    from anime_genres_unnested ag
    inner join {{ ref('dim_genres') }} g 
        on ag.genre_name = g.genre_name
)

select * from final