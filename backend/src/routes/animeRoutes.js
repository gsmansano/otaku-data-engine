import express from 'express';
import { getTopAnime } from '../controllers/animeController.js';

const router = express.Router();

router.get('/', getTopAnime);

export default router;