import { useEffect, useState } from "react";
import axios from "axios";
import GenreDominanceChart from "../components/market/GenreDominanceChart";
import YearlyTrendsChart from "../components/market/YearlyTrendsChart";
import styles from "./MarketTrends.module.css";
import EngagementChart from "../components/market/EngagementChart";

function MarketTrends() {
  const [data, setData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [themeData, setThemeData] = useState([]);
  const [rankGapData, setRankGapData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // axios fetch to backend
        const [trendsRes, genreRes, themeRes, gapRes] = await Promise.all([
          axios.get("http://localhost:3001/api/market/yearly-trends"),
          axios.get("http://localhost:3001/api/market/genre-performance"),
          axios.get("http://localhost:3001/api/market/theme-performance"),
          axios.get("http://localhost:3001/api/market/rank-gaps"),
        ]);

        
        const cleanedTrends = trendsRes.data.map((item) => ({
          year: item.release_year,
          count: Number(item.release_count),
          score: Number(item.avg_year_score),
          members: Number(item.avg_members),
          favorites: Number(item.avg_favorites),
        }));
        setData(cleanedTrends);


        setThemeData(
          themeRes.data.map((item) => ({
            theme: item.theme,
            count: Number(item.title_count),
            score: Number(item.avg_score),
          })),
        );

      
        setRankGapData(gapRes.data);

        // sorting gap data for the tables.
        const topGems = rankGapData.slice(0, 10);
        const topHype = [...rankGapData]
          .sort((a, b) => a.gap - b.gap)
          .slice(0, 10);
        const topPerfect = [...rankGapData]
          .sort((a, b) => Math.abs(a.gap) - Math.abs(b.gap))
          .slice(0, 10);


        const cleanedGenres = genreRes.data.map((item) => ({
          genre: item.genre,
          title_count: Number(item.title_count),
          avg_score: Number(item.avg_score),
        }));
        setGenreData(cleanedGenres);
      } catch (err) {
        console.error("Error fetching market dashboard data:", err);
      }
    };

    loadData();
  }, []);

  // sort data by year + get average score for reference
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  const overallAvg =
    data.length > 0
      ? Number(
          (
            data.reduce((acc, curr) => acc + curr.score, 0) / data.length
          ).toFixed(2),
        )
      : 0;

  return (
    // building the charts.

    <div className={styles.container}>
      <h2 className={styles.title}>Industry Evolution</h2>
      <p className={styles.subtitle}>Production volume vs. average rating</p>

      {/* Yearly trends chart */}
      <YearlyTrendsChart data={sortedData} overallAvg={overallAvg} />

      <h2 className={`${styles.title} ${styles.sectionSpacer}`}>
        Market Reach: Engagement
      </h2>
      <p className={styles.chartSubtitle}>
        Comparing Audience Size (Members) vs. Hardcore Fans (Favorites)
      </p>

      <EngagementChart data={sortedData} />

      <h2 className={`${styles.title} ${styles.sectionSpacer}`}>
        Genre Performance
      </h2>
      <p className={styles.chartSubtitle}>
        View of most celebrated genres in anime.
      </p>
      <GenreDominanceChart data={genreData} overallAvg={overallAvg} />
    </div>
  );
}

export default MarketTrends;
