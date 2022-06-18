import express from "express";
import { getMovieSearch } from "../controller/searchController";

const apiRouter = express.Router();

apiRouter.route("/search").get(getMovieSearch);

export default apiRouter;
