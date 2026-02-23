import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AnimeDetail from './pages/AnimeDetail';
import MarketTrends from './pages/MarketTrends';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/yearly-trends" element={<MarketTrends />} />
      </Routes>
    </Layout>
  );
}

export default App;