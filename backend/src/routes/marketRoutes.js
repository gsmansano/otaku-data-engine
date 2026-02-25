import express from 'express';
import { getGenrePerformance, getMarketSummary, getRankGaps, getStudioPerformance, getThemePerformance, getYearlyTrends } from '../controllers/marketController.js';

const router = express.Router();

router.get('/summary', getMarketSummary);
router.get('/yearly-trends', getYearlyTrends);
router.get('/genre-performance', getGenrePerformance);
router.get('/theme-performance', getThemePerformance);
router.get('/studios', getStudioPerformance);
router.get('/rank-gaps', getRankGaps);

export default router;