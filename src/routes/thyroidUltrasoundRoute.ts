import express from "express";

import {
  createNewThyroidUltrasound,
  getThyroidUltrasoundByServiceId,updateThyroidUltrasoundByServiceId
} from "../controllers/ThyroidUltrasoundController";

const Router = express.Router();

Router.route("/create").post(createNewThyroidUltrasound);
Router.route("/get").get(getThyroidUltrasoundByServiceId);
Router.route("/update").patch(updateThyroidUltrasoundByServiceId)

export default Router;
