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

const EngagementChart = ({ data }) => {
  if (!data || data.length === 0) return <p>Loading data...</p>;

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />

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
  );
};

export default EngagementChart;
