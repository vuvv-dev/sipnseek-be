import express from "express";
const Router = express.Router();
import { generateDocumentGeneral } from "../documents/generalMedicalReport";
import { generateAbdominalUltrasoundReport } from "../documents/abdominalUltrasoundReport";
import { generateElectrocarDiogramReport } from "../documents/electrocarDiogramReport";

Router.route("/general-medical-report").post(generateDocumentGeneral);
Router.route("/abdominal-ultrasound-report").post(
  generateAbdominalUltrasoundReport
);
Router.route("/electrocar-diagnosis-report").post(
  generateElectrocarDiogramReport
);
export default Router;
