import { useState, useEffect } from "react";
import axios from "axios";

export const useMarketData = () => {
  const [marketState, setMarketState] = useState({
    trends: [],
    genres: [],
    themes: [],
    rankGaps: { all: [], gems: [], hype: [], perfect: [] },
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trendsRes, genreRes, themeRes, gapRes] = await Promise.all([
          axios.get("http://localhost:3001/api/market/yearly-trends"),
          axios.get("http://localhost:3001/api/market/genre-performance"),
          axios.get("http://localhost:3001/api/market/theme-performance"),
          axios.get("http://localhost:3001/api/market/rank-gaps"),
        ]);

        setMarketState({
          trends: transformTrends(trendsRes.data),
          genres: transformGenres(genreRes.data),
          themes: transformThemes(themeRes.data),
          rankGaps: transformRankGaps(gapRes.data),
          loading: false,
          error: null,
        });
      } catch (err) {
        setMarketState((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    };
    loadData();
  }, []);

  return marketState;
};
