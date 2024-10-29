import express from "express";
const Router = express.Router();
import { getAllContact, deleteContact, createAContact, updateContact, getContactById } from "../controllers/ContactController";
import { verifyAuthentication } from "../middlewares/veriftyAuthentication";

Router.route("/create").post(createAContact);
Router.route("/get").get(verifyAuthentication, getAllContact);
Router.route("/get/:id").get(verifyAuthentication, getContactById);
Router.route("/update").patch(verifyAuthentication, updateContact);
Router.route('/delete/:id').delete(verifyAuthentication,deleteContact);
export default Router;