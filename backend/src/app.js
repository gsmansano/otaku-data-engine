import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import animeRoutes from './routes/animeRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/anime', animeRoutes);

app.get('/ping', (req, res) => {
    res.json({ message: 'API is live!'})
});

app.listen(PORT, () =>{
    console.log(`Server running on port:${PORT}`);
});