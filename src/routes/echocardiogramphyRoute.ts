import express from "express";
const Router = express.Router();
import { createNewEchocardiography, updateEchocardiographyByServiceId, getEchocardiographyByServiceId} from "../controllers/EchocardiographyController";
import { verifyAuthentication } from "../middlewares/veriftyAuthentication";

Router.route("/create").post(verifyAuthentication,createNewEchocardiography);
Router.route("/get").get(verifyAuthentication,getEchocardiographyByServiceId);
Router.route("/update").patch(verifyAuthentication,updateEchocardiographyByServiceId);
export default Router;
