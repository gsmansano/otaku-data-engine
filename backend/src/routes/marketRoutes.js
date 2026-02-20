import express from 'express';
import { getMarketSummary, getStudioPerformance, getYearlyTrends } from '../controllers/marketController.js';

const router = express.Router();

router.get('/summary', getMarketSummary);
router.get('/trends', getYearlyTrends);
router.get('/studios', getStudioPerformance)

export default router;