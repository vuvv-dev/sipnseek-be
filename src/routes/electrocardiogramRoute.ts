import express from "express";

import {
  createNewElectrocardiogram,
  getElectrocardiogramByServiceId,updateElectrocardiogramByServiceId,deleteElectrocardiogramByServiceId
} from "../controllers/ElectrocardiogramController";

const Router = express.Router();

Router.route("/create").post(createNewElectrocardiogram);
Router.route("/get").get(getElectrocardiogramByServiceId);
Router.route("/update").patch(updateElectrocardiogramByServiceId)
Router.route("/delete/:id").delete(deleteElectrocardiogramByServiceId)

export default Router;
