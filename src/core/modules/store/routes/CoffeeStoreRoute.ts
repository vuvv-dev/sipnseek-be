import express from "express";
import { CreateStore } from "../controllers/CreateStore";
import { GetAllStore } from "../controllers/GetAllStore";
import { GetAllStoreForAdmin } from "../controllers/GetAllStoreAdmin";

const Router = express.Router();

Router.route("/create").post(CreateStore);
Router.route("/get-all").get(GetAllStore);
Router.route("/get-all-admin").get(GetAllStoreForAdmin);    

export default Router;
