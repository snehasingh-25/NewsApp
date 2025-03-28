
// import News from '../model/news.js';


// export const getNews = async (request, response) => {
//     try {
//         const size = Number(request.query.size);
//         const skip = Number(request.query.page);
//         console.log(size, skip)
//         const data = await News.find({}).limit(size).skip(size * skip);
//         // console.log(data.count());
//         response.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         response.status(500).json(error);
//     }
// }

import News from '../model/news.js';

export const getNews = async (request, response) => {
    try {
        const size = Number(request.query.size) || 5;  // Default size = 5
        const page = Number(request.query.page) || 0;  // Default page = 0
        const skip = size * page; // Calculate how many items to skip
        
        console.log(`Fetching news: size=${size}, page=${page}, skip=${skip}`);

        const data = await News.find().limit(size).skip(skip);

        if (!data.length) {
            return response.status(404).json({ message: "No news articles found" });
        }

        response.status(200).json(data);
    } catch (error) {
        console.error("Error fetching news:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
};
