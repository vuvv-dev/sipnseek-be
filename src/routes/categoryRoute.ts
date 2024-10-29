import express from "express";
const Router = express.Router();
import {
  getAllCategory,
  updateCategory,
  createCategory,
  deleteCategory,
  getAllActiveCategory,
} from "../controllers/CategoryController";
import { verifyAuthentication } from "../middlewares/veriftyAuthentication";

Router.route("/create").post(verifyAuthentication, createCategory);
Router.route("/get").get(verifyAuthentication, getAllCategory);
Router.route("/get-active").get(verifyAuthentication, getAllActiveCategory);
Router.route("/update").patch(verifyAuthentication, updateCategory);
Router.route("/delete/:id").delete(verifyAuthentication, deleteCategory);
export default Router;
