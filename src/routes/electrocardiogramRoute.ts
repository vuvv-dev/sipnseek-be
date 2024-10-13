import express from "express";

import {
  createNewElectrocardiogram,
  getElectrocardiogramByServiceId,updateElectrocardiogramByServiceId
} from "../controllers/ElectrocardiogramController";

const Router = express.Router();

Router.route("/create").post(createNewElectrocardiogram);
Router.route("/get").get(getElectrocardiogramByServiceId);
Router.route("/update").patch(updateElectrocardiogramByServiceId)

export default Router;
