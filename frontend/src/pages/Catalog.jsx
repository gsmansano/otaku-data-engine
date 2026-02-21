import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Catalog.module.css";

function Catalog() {
  const [animeData, setAnimeData] = useState({data: [], totalPages: 0});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/api/anime?page=${currentPage}&limit=20`)
      .then((res) => {
        setAnimeData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Catalog Fetch Error:", err);
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <div className={styles.catalogContainer}>
      <h2>Anime Catalog</h2>
      <p>Exploration of the top performing titles in the database.</p>

      {loading ? (
        <p>Loading catalog...</p>
      ) : (
        <>
          <table className={styles.animeTable}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Title</th>
                <th>Year</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {animeData.data && animeData.data.map((anime, index) => (
                <tr key={anime.anime_id}>
                  <td>{(currentPage - 1) * 20 + index + 1}</td>
                  <td><strong>{anime.title}</strong></td>
                  <td>{anime.release_year}</td>
                  <td>⭐ {anime.score}</td>
                  <td>{anime.airing_status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
            > Previous </button>
            <span> Page {currentPage} of {animeData.totalPages} </span>
            <button 
              disabled={currentPage === animeData.totalPages} 
              onClick={() => setCurrentPage(p => p + 1)}
            > Next </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Catalog;
