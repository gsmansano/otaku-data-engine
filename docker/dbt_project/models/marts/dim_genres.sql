-- creating a genre specific table
-- this will help to extract genres insights without creating problems with
-- repeated rows on a single table, as one anime contains several genres

with raw_genres as (
    select
        distinct unnest(string_to_array(genres, ', ')) as genre_name
    from {{ ref('stg_anime')}}
    where genres is not null
),

final as (
    select
        md5(genre_name) as genre_id,
        genre_name
    from raw_genres
)

select * from final