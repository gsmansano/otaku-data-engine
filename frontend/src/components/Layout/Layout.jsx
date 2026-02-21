import styles from './Layout.module.css';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <strong>Otaku Data Engine</strong>
        <div className={styles.links}>
          <Link to="/" className={styles.navItem}>Home</Link>
          <Link to="/catalog" className={styles.navItem}>Catalog</Link>
          <span className={styles.navItem}>Market Trends</span>
        </div>
      </nav>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}

export default Layout;