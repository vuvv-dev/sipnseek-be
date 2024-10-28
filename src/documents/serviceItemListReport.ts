import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../middlewares/errorHandler";
import path from "path";
import { promises as fs } from "fs";
import pdf from "html-pdf-node";
import Handlebars from "handlebars";

type Services = {
    index: number;
    code: string;
    name: string;
    price: string;
  };
type ServiceItemListReportType = {
  reportCode: string;
  patientName: string;
  age: string;
  gender: string;
  patientAddress: string;
  services: Services[];
  notice: string;
  year: string;
  day: string;
  month: string;
  doctorName: string;
};

export const generateServiceItemListReport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const {
      age,
      day,
      doctorName,
      gender,
      services,
      month,
      notice,
      patientAddress,
      patientName,
      reportCode,
      year,
    } = req?.body?.data as ServiceItemListReportType;
    const templatePath = path.join(
      __dirname,
      "../templates/serviceItemListTemplate.html"
    );
    const htmlTemplate = await fs.readFile(templatePath, "utf-8");
    const template = Handlebars.compile(htmlTemplate);
    const htmlContent = template({
      age,
      day,
      year,
      doctorName,
      gender,
      services,
      month,
      notice,
      patientAddress,
      patientName,
      reportCode,
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
