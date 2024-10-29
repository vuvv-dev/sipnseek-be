import express from "express";
const Router = express.Router();
import {
  createNewAbdominalUltrasound,
  getAbdominalUltrasoundByServiceId,
  updateAbdominalUltrasoundByServiceId,
  deleteAbdominalUltrasoundByServiceId,
} from "../controllers/AbdominalUltrasoundController";
import { verifyAuthentication } from "../middlewares/veriftyAuthentication";

Router.route("/create").post(
  verifyAuthentication,
  createNewAbdominalUltrasound
);
Router.route("/get").get(
  verifyAuthentication,
  getAbdominalUltrasoundByServiceId
);
Router.route("/update").patch(
  verifyAuthentication,
  updateAbdominalUltrasoundByServiceId
);
Router.route("/delete/:id").delete(
  verifyAuthentication,
  deleteAbdominalUltrasoundByServiceId
);
export default Router;
