import express from "express";
import { getMovieSearch, getImage, getMovieInfo } from "../controller/searchController";

const apiRouter = express.Router();

apiRouter.route("/search").get(getMovieSearch);
apiRouter.route("/getImage").get(getImage);
apiRouter.route("/getMovieInfo").get(getMovieInfo);

export default apiRouter;
