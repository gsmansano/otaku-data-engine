import * as db from '../config/db.js';

export const getTopAnime = async (req, res) =>{
    try{
        const queryText = 'SELECT * FROM mart_anime_overview LIMIT 250';
        const { rows } = await db.query(queryText);

        res.status(200).json(rows);
    }
    catch (err) {
        console.error('Error fetching animes:' , err);
        res.status(500).json({error: 'Database error.'});
    }
};
