import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const getMovieSearch = async (req, res) => {
  try {
    const response = await axios.get(`https://openapi.naver.com/v1/search/movie.json`, {
      headers: {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        query: req.query.keyword,
        display: 100,
      },
    });
    const data = response.data.items;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json(error.response.data);
  }
};
