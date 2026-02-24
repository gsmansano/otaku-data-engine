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
} from "recharts";
import styles from "../../pages/MarketTrends.module.css";

const GenreDominanceChart = ({ data, overallAvg }) => {
  if (!data || data.length === 0) return <p>Loading genre data...</p>;

  return (
    <div className={styles.chartWrapper} style={{ height: "600px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="horizontal"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
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

          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis
            dataKey="genre"
            interval={0}
            tick={{ fontSize: 11, angle: -45, textAnchor: "end" }}
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
            stroke="#2d6a4f"
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar
            yAxisId="left"
            dataKey="title_count"
            name="Number of Titles"
            fill="#8884d8"
            barSize={30}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avg_score"
            name="Avg Score"
            stroke="#2d6a4f"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenreDominanceChart;
