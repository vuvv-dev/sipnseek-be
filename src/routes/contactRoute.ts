import express from "express";
const Router = express.Router();
import { getAllContact, deleteContact, createAContact, updateContact, getContactById } from "../controllers/ContactController";

Router.route("/create").post(createAContact);
Router.route("/get").get(getAllContact);
Router.route("/get/:id").get(getContactById);
Router.route("/update").patch(updateContact);
Router.route('/delete/:id').delete(deleteContact);
export default Router;