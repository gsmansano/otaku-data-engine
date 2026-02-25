// cleanup of the data for yearly trends chart
export const transformTrends = (rawTrends) => {
  return rawTrends
    .map((item) => ({
      year: item.release_year,
      count: Number(item.release_count),
      score: Number(item.avg_year_score),
      members: Number(item.avg_members),
      favorites: Number(item.avg_favorites),
    }))
    .sort((a, b) => a.year - b.year);
};

export const calculateOverallAvg = (data) => {
  if (!data?.length) return 0;
  const total = data.reduce((acc, curr) => acc + curr.score, 0);
  return Number((total / data.length).toFixed(2));
};

// cleanup of the genre data
export const transformGenres = (rawGenres) => {
  return rawGenres.map((item) => ({
    genre: item.genre,
    title_count: Number(item.title_count),
    avg_score: Number(item.avg_score),
  }));
};

// cleanup for the themes chart
export const transformThemes = (rawThemes) => {
  return rawThemes.map((item) => ({
    theme: item.theme,
    count: Number(item.title_count),
    score: Number(item.avg_score),
  }));
};

// getting the gap data, no cleanup (yet)
export const transformRankGaps = (rawGaps) => {
  const topGems = rawGaps.slice(0, 10);
  const topHype = [...rawGaps].sort((a, b) => a.gap - b.gap).slice(0, 10);
  const topPerfect = [...rawGaps]
    .sort((a, b) => Math.abs(a.gap) - Math.abs(b.gap))
    .slice(0, 10);

  return {
    all: rawGaps,
    gems: topGems,
    hype: topHype,
    perfect: topPerfect,
  };
};
