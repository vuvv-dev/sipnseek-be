import express from "express";
import { CreateImageGallery } from "../controllers/CreateImageGallery";

const Router = express.Router();

Router.route("/create").post(CreateImageGallery);

export default Router;
