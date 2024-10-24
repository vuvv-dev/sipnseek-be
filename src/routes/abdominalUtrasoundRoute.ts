import express from "express";
const Router = express.Router();
import { createNewAbdominalUltrasound, getAbdominalUltrasoundByServiceId, updateAbdominalUltrasoundByServiceId,deleteAbdominalUltrasoundByServiceId} from "../controllers/AbdominalUltrasoundController";

Router.route("/create").post(createNewAbdominalUltrasound);
Router.route("/get").get(getAbdominalUltrasoundByServiceId);
Router.route("/update").patch(updateAbdominalUltrasoundByServiceId);
Router.route("/delete/:id").delete(deleteAbdominalUltrasoundByServiceId);
export default Router;
