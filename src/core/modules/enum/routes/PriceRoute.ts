import express from "express";
import { GetPrices } from "../controllers/PriceController";
const Router = express.Router();

Router.route("/get").get(GetPrices);

export default Router;