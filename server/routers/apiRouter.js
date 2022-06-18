import express from "express";
import { postMovieSearch, postImage, postMovieInfo } from "../controller/searchController";

const apiRouter = express.Router();

apiRouter.route("/search").post(postMovieSearch);
apiRouter.route("/getImage").post(postImage);
apiRouter.route("/getMovieInfo").post(postMovieInfo);

export default apiRouter;
