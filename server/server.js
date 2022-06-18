import express from "express";
import apiRouter from "./routers/apiRouter";
import cors from "cors";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const KMDB_API_KEY = process.env.KMDB_API_KEY;

// 배포용 주소와 개발용 주소 화이트 리스트에 추가
const whitelist = [
  "http://localhost:5000",
  "http://localhost:3000",
  "https://chanoo-movie-app.herokuapp.com",
];
// 위 whitelist에 포함된 주소면 넘기고 아니면 오류
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// 프론트로부터 json data를 받아오기 위한
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

// 해당 path 라우터
// cors 설정 미들웨어 (origin 주소에서만 허용)
app.get("/api/movie/getImage", async (req, res) => {
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
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error.response.data);
  }
});

// root로 접근 시 이 프론트를 띄우줌
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`));
