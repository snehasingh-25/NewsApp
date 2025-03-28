// import axios from 'axios';
// const URL = 'http://localhost:8000';
// export const getNews=async (page,size=5)=>{
    
//     try{
//         return await axios.get(`${URL}/news?page=${page}&size=${size}`)
//     }
//     catch(error){
//         console.log('Error',error);
//     }
// }

import axios from 'axios';

const URL = 'http://localhost:8000';

export const getNews = async (page = 1, size = 5) => {
    try {
        const response = await axios.get(`${URL}/news?page=${page}&size=${size}`);
        return response.data; // Return only the response data
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        return null; // Return null in case of an error
    }
};
