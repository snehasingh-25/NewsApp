// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv'

// //components
// import Connection from './database/db.js';
// import Route from './routes/Route.js';
// import DefaultData from './default.js'

// const app = express();
// dotenv.config();

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));
// app.use('/', Route);

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// const PORT = 8000;

// Connection(username, password);

// app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

// DefaultData();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
//const NEWS_API_URL ='https://gnews.io/api/v4/top-headlines';
const NEWS_API_KEY = process.env.NEWS_API_KEY; // Store your API key in `.env`

// API endpoint to fetch news
app.get('/news', async (req, res) => {
    try {
        const { country = 'us', category = 'general', lang = 'en', max = 10 } = req.query; 
        const url = `${NEWS_API_URL}?category=${category}&lang=${lang}&country=${country}&max=${max}&apikey=${NEWS_API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching news: ${response.statusText}`);

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

