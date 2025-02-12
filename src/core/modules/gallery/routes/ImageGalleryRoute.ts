import express from "express";
import { CreateImageGallery } from "../controllers/CreateImageGallery";
import { GetAllImageGallery } from "../controllers/GetAllImageGallery";
import { DeleteById } from "../controllers/DeleteById";

const Router = express.Router();

Router.route("/create").post(CreateImageGallery);
Router.route("/get-all").get(GetAllImageGallery);
Router.route("/delete").delete(DeleteById)

export default Router;
