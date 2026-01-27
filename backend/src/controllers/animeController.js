import * as db from "../config/db.js";

export const getTopAnime = async (req, res) => {
  try {
    const queryText = "SELECT * FROM mart_anime_overview LIMIT 250";
    const { rows } = await db.query(queryText);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching animes:", err);
    res.status(500).json({ error: "Database error." });
  }
};

export const getAnimeById = async (req, res) => {
  const { id } = req.params;
  try {
    const queryText = "SELECT * FROM mart_anime_overview WHERE anime_id = $1";
    const { rows } = await db.query(queryText, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Anime not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error : ", error);
    res.statuss(500).json({ error: "Database error" });
  }
};
