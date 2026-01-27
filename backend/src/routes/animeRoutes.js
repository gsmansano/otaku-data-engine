import express from 'express';
import { getTopAnime, getAnimeById } from '../controllers/animeController.js';

const router = express.Router();

router.get('/', getTopAnime);
router.get('/:id', getAnimeById);

export default router;