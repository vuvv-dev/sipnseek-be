import express from "express";

import { start } from "../controller/startController";

const Router = express.Router();

Router.route("/").get(start);

export default Router;
