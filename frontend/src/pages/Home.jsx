import { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard/StatCard';
import styles from '../App.module.css';

function Home() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/market/summary')
      .then(res => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2 className={styles.pageTitle}>Market Overview</h2>
      
      {loading ? (
        <p>Loading market insights...</p>
      ) : summary ? (
        <div className={styles.dashboardGrid}>
          <StatCard title="Total Titles" value={summary.total_titles} unit="Series" />
          <StatCard title="Avg Score" value={summary.average_market_score} unit="/ 10" />
          <StatCard title="Total Studios" value={summary.total_studios} unit="Partners" />
        </div>
      ) : (
        <p>Error: Could not fetch data.</p>
      )}
    </>
  );
}

export default Home;