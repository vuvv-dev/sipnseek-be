import express from "express";

import {
  createNewThyroidUltrasound,
  getThyroidUltrasoundByServiceId,
  updateThyroidUltrasoundByServiceId,
} from "../controllers/ThyroidUltrasoundController";
import { verifyAuthentication } from "../middlewares/veriftyAuthentication";

const Router = express.Router();

Router.route("/create").post(verifyAuthentication, createNewThyroidUltrasound);
Router.route("/get").get(verifyAuthentication, getThyroidUltrasoundByServiceId);
Router.route("/update").patch(
  verifyAuthentication,
  updateThyroidUltrasoundByServiceId
);

export default Router;
