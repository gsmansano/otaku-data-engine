import express from 'express';
import { getMarketSummary, getYearlyTrends } from '../controllers/marketController.js';

const router = express.Router();

router.get('/summary', getMarketSummary);
router.get('/trends', getYearlyTrends);

export default router;