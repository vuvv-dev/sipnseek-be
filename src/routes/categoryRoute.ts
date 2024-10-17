import express from "express";
const Router = express.Router();
import { getAllCategory, updateCategory, createCategory, deleteCategory, getAllActiveCategory } from "../controllers/CategoryController";

Router.route("/create").post(createCategory);
Router.route("/get").get(getAllCategory);
Router.route("/get-active").get(getAllActiveCategory);
Router.route("/update").patch(updateCategory);
Router.route('/delete/:id').delete(deleteCategory);
export default Router;
