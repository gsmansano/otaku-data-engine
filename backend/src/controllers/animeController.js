import * as db from "../config/db.js";

export const getTopAnime = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const queryText = `
      SELECT anime_id, title, release_year, score, airing_status 
      FROM mart_anime_overview 
      ORDER BY score DESC 
      LIMIT $1 OFFSET $2`;

    const queryCount = `SELECT COUNT(*) FROM mart_anime_overview`;

    const data = await db.query(queryText, [limit, offset]);
    const totalCount = await db.query(queryCount);

    res.status(200).json({
      data: data.rows,
      total: parseInt(totalCount.rows[0].count),
      page,
      totalPages: Math.ceil(totalCount.rows[0].count / limit),
    });
  } catch (err) {
    console.error("Error fetching animes:", err);
    res.status(500).json({ error: "Database error." });
  }
};

export const getAnimeById = async (req, res) => {
  const { id } = req.params;
  try {
    const queryText = `
   SELECT 
      m.*, 
      d.image_url
    FROM mart_anime_overview m
    JOIN dim_anime d ON m.anime_id = d.anime_id
    WHERE m.anime_id = $1;`;

    const { rows } = await db.query(queryText, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Anime not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error : ", error);
    res.status(500).json({ error: "Database error" });
  }
};
