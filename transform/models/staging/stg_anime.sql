with source as (
    select * from {{ source('raw_data', 'raw_top_anime') }}
),

renamed as (
    select
        -- id
        cast(mal_id as integer) as anime_id,
        
        -- text fields
        title,
        type as media_type,
        status as airing_status,
        aired_from,
        source as anime_source,
        studios, -- may contain more than 1 studio
        genres, -- same, but almost def contains 1+
        themes, -- seen plenty of nulls, but mostly 1+
        image_url,
        demographics,
        rating,
        synopsis,
        season,
        
        -- date/count fields
        coalesce(
            cast(year as integer), -- casting as integer
            cast(substring(aired_from from 1 for 4) as integer) -- using the first 4 chars of the aired from (the year) to substitute, as a few are missing year
            ) as release_year,
        cast(episodes as integer) as episodes,
        
        -- numeric fields
        cast(score as numeric) as score,
        cast(scored_by as integer) as scored_by,
        cast(rank as integer) as rank,
        cast(popularity as integer) as popularity,
        cast(members as integer) as members,
        cast(favorites as integer) as favorites

    from source
)

select * from renamed