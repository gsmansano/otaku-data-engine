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

const YearlyTrendsChart = ({ data, overallAvg }) => {
  if (!data || data.length === 0) return <p>Loading data...</p>;

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
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

          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />

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
  );
};

export default YearlyTrendsChart;
