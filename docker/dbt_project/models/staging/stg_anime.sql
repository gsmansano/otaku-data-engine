with source as (
    select * from {{ source('raw_data', 'raw_top_anime') }}
),

renamed as (
    select
        -- ids
        mal_id as anime_id,
        
        -- text fields
        title,
        type as media_type,
        status,
        source as anime_source,
        
        -- date/count fields
        year,
        episodes,
        
        -- numeric fields
        score,
        scored_by,
        rank,
        popularity,
        members,
        favorites

    from source
)

select * from renamed