import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AnimeDetail.module.css";

function AnimeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/anime/${id}`)
      .then((res) => {
        setAnime(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching anime details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading anime profile...</p>;
  if (!anime) return <p>Anime not found.</p>;

  return (
    <div>
      <div className={styles.detailContainer}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className={styles.profileCard}>
          <div className={styles.mainInfo}>
            <img
              src={anime.image_url}
              alt={anime.title}
              className={styles.animeImg}
            />

            <div className={styles.titleSection}>
              <h1>{anime.title}</h1>
              <p className={styles.genres}>{anime.genres}</p>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <p>
              <strong>Year</strong> {anime.release_year}
            </p>
            <p>
              <strong>Score</strong> ⭐ {anime.score}
            </p>
            <p>
              <strong>Rank</strong> #{anime.rank}
            </p>
            <p>
              <strong>Popularity</strong> #{anime.popularity}
            </p>
            <p>
              <strong>Favorites</strong> ❤️ {anime.favorites?.toLocaleString()}
            </p>
            <p>
              <strong>Status</strong> {anime.airing_status}
            </p>
            <p>
              <strong>Studios</strong> {anime.studios}
            </p>
          </div>

          <a
            href={`https://myanimelist.net/anime/${id}`}
            target="_blank"
            rel="noreferrer"
            className={styles.malLink}
          >
            View on MyAnimeList ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetail;
