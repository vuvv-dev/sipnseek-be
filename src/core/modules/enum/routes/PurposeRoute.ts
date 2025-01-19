import express from "express";
import { GetPurpose } from "../controllers/PurposeController";
import { Purpose } from "../models/Purpose";
const Router = express.Router();

Router.route("/get").get(GetPurpose);

export default Router;