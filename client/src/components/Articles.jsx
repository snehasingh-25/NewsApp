// import React from 'react'
// import { useEffect, useState } from 'react';
// import { getNews } from '../service/api';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import Article from './Article';
// const Articles = () => {
//   const [news, setNews] = useState([]);
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     const dailyNews = async () => {
//       const response = await getNews(page);
//       console.log(new Set([...news, ...response.data]));
//       setNews([...new Set([...news, ...response.data])]);
//     }
//     dailyNews();
//   }, [page])

//   useEffect(() => {
//     console.log(news);
//   }, [news])
//   return (
//     <InfiniteScroll
//       dataLength={news.length}
//       next={() => setPage(page => page + 1)}
//       hasMore={true}
//     >
//       {
//         news.map(article => (
//           <Article article={article} />
//         ))
//       }
//     </InfiniteScroll>
//   )
// }

// export default Articles;

// import React, { useEffect, useState } from 'react';
// import { getNews } from '../service/api';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import Article from './Article';

// const Articles = () => {
//   const [news, setNews] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // Function to fetch news
//   const fetchNews = async (currentPage) => {
//     try {
//       const response = await getNews(currentPage);

//       if (!Array.isArray(response)) {
//         console.error("Invalid response format:", response);
//         return;
//       }

//       // Remove duplicates
//       const uniqueNews = Array.from(new Set([...response, ...news].map(JSON.stringify))).map(JSON.parse);

//       setNews(uniqueNews);

//       if (response.length < 5) setHasMore(false);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//     }
//   };

//   // Fetch news when the page number changes (infinite scroll)
//   useEffect(() => {
//     fetchNews(page);
//   }, [page]);

//   // Auto-fetch new news every 60 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchNews(1); // Always fetch the latest news from page 1
//     }, 60000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <InfiniteScroll
//       dataLength={news.length}
//       next={() => setPage(prevPage => prevPage + 1)}
//       hasMore={hasMore}
//       loader={<h4>Loading...</h4>}
//     >
//       {news.map((article, index) => (
//         <Article key={index} article={article} />
//       ))}
//     </InfiniteScroll>
//   );
// };

// export default Articles;

import React, { useEffect, useState, useCallback } from "react";
import { getNews } from "../service/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";

const Articles = ({ location }) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch news (useCallback to avoid unnecessary re-creations)
  const fetchNews = useCallback(
    async (currentPage, append = true) => {
      try {
        const response = await getNews(currentPage);
        const articles = response?.data?.articles || [];

        if (!Array.isArray(articles)) {
          console.error("Invalid response format:", response);
          return;
        }

        console.log(`Fetched ${articles.length} articles for ${location}`);

        setNews((prevNews) => {
          const combinedNews = append ? [...prevNews, ...articles] : articles;
          const uniqueNews = Array.from(new Set(combinedNews.map(JSON.stringify))).map(JSON.parse);
          return uniqueNews;
        });

        setHasMore(articles.length >= 5);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
    [location]
  );

  // Fetch news when the page number changes
  useEffect(() => {
    fetchNews(page);
  }, [fetchNews, page]);

  // Fetch fresh news when location changes
  useEffect(() => {
    if (location) {
      setNews([]); // Clear old articles
      setPage(1);
      setHasMore(true);
      fetchNews(1, false);
    }
  }, [location, fetchNews]);

  // Auto-refresh news every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews(1, false);
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={() => setPage((prevPage) => prevPage + 1)}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {news.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </InfiniteScroll>
  );
};

export default Articles;

