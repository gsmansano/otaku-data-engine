import * as db from "../config/db.js";

export const getMarketSummary = async (req, res) => {
  try {
    const queryText = `
            SELECT
                COUNT(*) as total_titles,
                ROUND(AVG(members), 0) as avg_members_per_title,
                MAX(members) as top_title_reach,
                ROUND(AVG(score), 2) as average_market_score,
                (SELECT COUNT(*) FROM dim_studios) as total_studios
                FROM mart_anime_overview`;

    const { rows } = await db.query(queryText);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch summary." });
  }
};

export const getYearlyTrends = async (req, res) => {
  try {
    const queryText = `
      SELECT 
        release_year,
        COUNT(*) as release_count,
        ROUND(AVG(score)::numeric, 2) as avg_year_score,
        ROUND(AVG(members)::numeric, 0) as avg_members,
        ROUND(AVG(favorites)::numeric, 0) as avg_favorites
      FROM mart_anime_overview
      WHERE release_year IS NOT NULL
      GROUP BY release_year
      ORDER BY release_year DESC
    `;
    const { rows } = await db.query(queryText);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch yearly trends" });
  }
};

export const getStudioPerformance = async (req, res) => {
  try {
    const queryText = `
      SELECT 
        s.studio_name,
        COUNT(m.anime_id) as total_anime,
        ROUND(AVG(m.score), 2) as avg_studio_score,
        SUM(m.members) as total_studio_reach
      FROM mart_anime_overview m
      JOIN bridge_anime_studios b ON m.anime_id = b.anime_id
      JOIN dim_studios s ON b.studio_id = s.studio_id
      GROUP BY s.studio_name
      HAVING COUNT(m.anime_id) > 1
      ORDER BY avg_studio_score DESC
    `;

    const { rows } = await db.query(queryText);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch studio performance." });
  }
};

export const getGenrePerformance = async (req, res) => {
  try {
    const queryText = `
    SELECT 
        trim(g.gen) as genre, 
        COUNT(*) as title_count, 
        ROUND(AVG(main.score)::numeric, 2) as avg_score
    FROM (
        SELECT genres, score 
        FROM mart_anime_overview 
        WHERE genres IS NOT NULL
    ) AS main
    CROSS JOIN LATERAL regexp_split_to_table(main.genres, ',') AS g(gen)
    GROUP BY trim(g.gen)
    ORDER BY title_count DESC;
  `;

    const { rows } = await db.query(queryText);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getThemePerformance = async (req, res) => {
  try {
    const queryText = `
    SELECT 
        trim(t.theme_name) as theme, 
        COUNT(*) as title_count, 
        ROUND(AVG(main.score)::numeric, 2) as avg_score
    FROM (
        SELECT themes, score 
        FROM mart_anime_overview 
        WHERE themes IS NOT NULL
    ) AS main
    CROSS JOIN LATERAL regexp_split_to_table(main.themes, ',') AS t(theme_name)
    GROUP BY trim(t.theme_name)
    ORDER BY title_count DESC;
  `;

    const { rows } = await db.query(queryText);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
