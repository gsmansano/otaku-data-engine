import { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
} from "recharts";
import styles from "./MarketTrends.module.css";

function MarketTrends() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/market/yearly-trends")
      .then((res) => {
        const cleanedData = res.data.map((item) => ({
          year: item.release_year,
          count: Number(item.release_count),
          score: Number(item.avg_year_score),
          members: Number(item.avg_members),
          favorites: Number(item.avg_favorites),
        }));
        setData(cleanedData);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(data);

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
    <div className={styles.container}>
      <h2 className={styles.title}>Industry Evolution</h2>
      <p className={styles.subtitle}>Production volume vs. average rating</p>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer>
          <ComposedChart data={sortedData}>
            <ReferenceLine
              yAxisId="right"
              y={overallAvg}
              label={{
                value: `Avg: ${overallAvg}`,
                position: "right",
                fill: "#ff7300",
                fontSize: 12,
              }}
              stroke="#ff7300"
              strokeDasharray="3 3"
            />

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.5}
            />

            <XAxis
              dataKey="year"
              type="number"
              domain={["dataMin - 1", "dataMax + 1"]}
              tickCount={10}
              tick={{ fontSize: 12 }}
              tickFormatter={(val) => val.toString()}
            />

            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              name="Titles"
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[8, 10]}
              stroke="#82ca9d"
              tickFormatter={(val) => val.toFixed(1)}
            />

            <Tooltip />
            <Legend />

            <Bar
              yAxisId="left"
              dataKey="count"
              name="Titles Released"
              fill="#8884d8"
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="score"
              name="Avg Score"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <h2 className={`${styles.title} ${styles.sectionSpacer}`}>
        Market Reach: Engagement
      </h2>
      <p className={styles.chartSubtitle}>
        Comparing Audience Size (Members) vs. Hardcore Fans (Favorites)
      </p>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={sortedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.3}
            />

            <XAxis
              dataKey="year"
              type="number"
              domain={["dataMin - 1", "dataMax + 1"]}
              tickFormatter={(val) => val.toString()}
            />

            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              name="Members"
              tickFormatter={(val) =>
                val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val
              }
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#82ca9d"
              name="Favorites"
              tickFormatter={(val) =>
                val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val
              }
            />

            <Tooltip />
            <Legend verticalAlign="top" height={36} />

            <Bar
              yAxisId="left"
              dataKey="members"
              name="Avg Members"
              fill="#8884d8"
              opacity={0.6}
              barSize={20}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="favorites"
              name="Avg Favorites"
              stroke="#2d6a4f"
              strokeWidth={3}
              dot={{ r: 4, fill: "#82ca9d" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MarketTrends;
