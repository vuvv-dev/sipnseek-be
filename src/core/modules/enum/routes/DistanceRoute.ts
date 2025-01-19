import express from "express";
import { GetDistances } from "../controllers/DistanceController";
const Router = express.Router();

Router.route("/get").get(GetDistances);

export default Router;