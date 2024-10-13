import express from "express";
const Router = express.Router();
import {generateDocumentDemo} from "../documents/demo";

Router.route("/demo").post(generateDocumentDemo);
export default Router;
