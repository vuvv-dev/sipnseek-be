import express from "express";
import { CreateStoreMenu } from "../controllers/CreateStoreMenu";
import { DeleteById } from "../controllers/DeleteById";

const Router = express.Router();
Router.route("/create").post(CreateStoreMenu);
Router.route("/delete").delete(DeleteById);

export default Router;
