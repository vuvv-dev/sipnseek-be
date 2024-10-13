import express from "express";
const Router = express.Router();
import { createNewAbdominalUltrasound, getAbdominalUltrasoundByServiceId, updateAbdominalUltrasoundByServiceId} from "../controllers/AbdominalUltrasoundController";

Router.route("/create").post(createNewAbdominalUltrasound);
Router.route("/get").get(getAbdominalUltrasoundByServiceId);
Router.route("/update").patch(updateAbdominalUltrasoundByServiceId);
export default Router;
