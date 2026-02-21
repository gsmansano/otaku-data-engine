import { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from './components/StatCard/StatCard';
import styles from './App.module.css';

function App() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/market/summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Otaku Data Engine</h1>
      
      {summary && (
        <div className={styles.dashboardGrid}>
          <StatCard 
            title="Total Titles" 
            value={summary.total_titles} 
            unit="Series" 
          />
          <StatCard 
            title="Avg Score" 
            value={summary.average_market_score} 
            unit="/ 10" 
          />
        </div>
      )}
    </div>
  );
}

export default App;