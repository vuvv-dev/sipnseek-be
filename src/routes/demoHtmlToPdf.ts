import express from "express";
const Router = express.Router();
import {generateDocumentHtmlToPdfDemo} from "../documents/demohtml2pdf";

Router.route("/demo-html-2-pdf").post(generateDocumentHtmlToPdfDemo);
export default Router;
