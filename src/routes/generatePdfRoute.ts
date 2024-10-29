import express from "express";
const Router = express.Router();
import { generateDocumentGeneral } from "../documents/generalMedicalReport";
import { generateAbdominalUltrasoundReport } from "../documents/abdominalUltrasoundReport";
import { generateElectrocarDiogramReport } from "../documents/electrocarDiogramReport";
import { generateMedicineItemListReport } from "../documents/medicineItemListReport";
import {generateServiceItemListReport} from '../documents/serviceItemListReport'
Router.route("/general-medical-report").post(generateDocumentGeneral);
Router.route("/abdominal-ultrasound-report").post(
  generateAbdominalUltrasoundReport
);
Router.route("/electrocar-diagnosis-report").post(
  generateElectrocarDiogramReport
);
Router.route("/medicine-report").post(generateMedicineItemListReport);
Router.route("/service-report").post(generateServiceItemListReport);

export default Router;
