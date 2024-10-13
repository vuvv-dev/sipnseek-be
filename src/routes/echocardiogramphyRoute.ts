import express from "express";
const Router = express.Router();
import { createNewEchocardiography, updateEchocardiographyByServiceId, getEchocardiographyByServiceId} from "../controllers/EchocardiographyController";

Router.route("/create").post(createNewEchocardiography);
Router.route("/get").get(getEchocardiographyByServiceId);
Router.route("/update").patch(updateEchocardiographyByServiceId);
export default Router;
