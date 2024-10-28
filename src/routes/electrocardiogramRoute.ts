import express from "express";

import {
  createNewElectrocardiogram,
  getElectrocardiogramByServiceId,
  updateElectrocardiogramByServiceId,
  deleteElectrocardiogramByServiceId,
} from "../controllers/ElectrocardiogramController";
import { verifyAuthentication } from "../middlewares/veriftyAuthentication";

const Router = express.Router();

Router.route("/create").post(verifyAuthentication, createNewElectrocardiogram);
Router.route("/get").get(verifyAuthentication, getElectrocardiogramByServiceId);
Router.route("/update").patch(
  verifyAuthentication,
  updateElectrocardiogramByServiceId
);
Router.route("/delete/:id").delete(
  verifyAuthentication,
  deleteElectrocardiogramByServiceId
);

export default Router;
