import * as db from "../config/db.js";

export const getMarketSummary = async (req, res) => {
  try {
    const queryText = `
            SELECT
                COUNT(*) as total_titles,
                ROUND(AVG(members), 0) as avg_members_per_title,
                MAX(members) as top_title_reach,
                ROUND(AVG(score), 2) as average_market_score
                FROM mart_anime_overvieW`;

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
        ROUND(AVG(score), 2) as avg_year_score,
        ROUND(AVG(members), 0) as avg_popularity
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
