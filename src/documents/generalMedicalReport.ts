import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import path from "path";
import { ErrorType } from "../middlewares/errorHandler";
import { pad } from "lodash";
import pdf from "html-pdf-node";

type Services = {
  index: number;
  code: string;
  name: string;
  price: string;
};
type Medicines = {
  index: number;
  name: string;
  quantity: string;
  usage: string;
};
type GenderalMedicalReport = {
  reportCode: string;
  patientName: string;
  age: string;
  gender: string;
  patientAddress: string;
  historyOfIllness: string;
  overallStatus: string;
  height: string;
  pulse: string;
  temperature: string;
  bloodPressure: string;
  weight: string;
  services: Services[];
  medicines: Medicines[];
  finalConsultation: string;
  year: string;
  day: string;
  month: string;
  doctorName: string;
};

export const generateDocumentGeneral = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const {
      reportCode,
      age,
      bloodPressure,
      finalConsultation,
      gender,
      height,
      historyOfIllness,
      medicines,
      overallStatus,
      patientAddress,
      patientName,
      pulse,
      services,
      temperature,
      weight,
      day,
      month,
      year,
      doctorName,
    } = req.body as GenderalMedicalReport;

    const templatePath = path.join(
      __dirname,
      "../templates/generalMedicalReporttemplate.html"
    );

    const htmlTemplate = await fs.readFile(templatePath, "utf-8");
    const template = Handlebars.compile(htmlTemplate);
    const htmlContent = template({
      reportCode,
      age,
      bloodPressure,
      finalConsultation,
      gender,
      height,
      historyOfIllness,
      medicines,
      overallStatus,
      patientAddress,
      patientName,
      pulse,
      services,
      temperature,
      weight,
      day,
      month,
      year,
      doctorName,
    });
    const file = { content: htmlContent };
    const pdfBuffer = await pdf.generatePdf(file, { format: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="document.pdf"');
    res.end(pdfBuffer);
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
