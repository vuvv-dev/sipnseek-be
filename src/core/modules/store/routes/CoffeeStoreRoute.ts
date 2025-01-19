import express from "express";
import { CreateStore } from "../controllers/CreateStore";

const Router = express.Router();

Router.route("/create").post(CreateStore);

export default Router;
