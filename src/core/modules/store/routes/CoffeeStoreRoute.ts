import express from "express";
import { CreateStore } from "../controllers/CreateStore";
import { GetAllStore } from "../controllers/GetAllStore";
import { GetAllStoreForAdmin } from "../controllers/GetAllStoreAdmin";
import { GetStoreById } from "../controllers/GetStoreById";
import { DeleteStoreById } from "../controllers/DeleteStoreById";
import { UpdateStore } from "../controllers/UpdateStore";

const Router = express.Router();

Router.route("/create").post(CreateStore);
Router.route("/get-all").get(GetAllStore);
Router.route("/get-all-admin").get(GetAllStoreForAdmin);
Router.route("/get-store-by-id").get(GetStoreById);
Router.route("/delete-store-by-id").delete(DeleteStoreById);
Router.route("/update-store").patch(UpdateStore);

export default Router;
