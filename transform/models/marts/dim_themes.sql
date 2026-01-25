-- separating the themes from main table for more accurate insights.

with raw_themes as (
    select
        distinct unnest(string_to_array(coalesce(themes, 'Unknown'), ', ')) as theme_name
    from {{ ref('stg_anime') }}
)

select
    md5(theme_name) as theme_id,
    theme_name
from raw_themes