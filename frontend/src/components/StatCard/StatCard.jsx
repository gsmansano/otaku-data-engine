// src/components/StatCard.jsx
import styles from './StatCard.module.css';

function StatCard({ title, value, unit }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.label}>{title}</h3>
      <p className={styles.value}>
        {value} <span className={styles.unit}>{unit}</span>
      </p>
    </div>
  );
}

export default StatCard;