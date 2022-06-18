import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const KMDB_API_KEY = process.env.KMDB_API_KEY;

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

export const getImage = async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&listCount=1`,
      {
        params: {
          ServiceKey: KMDB_API_KEY,
          title: req.query.title,
          releaseDts: req.query.releaseDts,
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json(error.response.data);
  }
};

export const getMovieInfo = async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&listCount=1`,
      {
        params: {
          ServiceKey: KMDB_API_KEY,
          title: req.query.title,
          releaseDts: req.query.releaseDts,
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json(error.response.data);
  }
};
