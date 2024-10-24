import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import path from "path";
import { ErrorType } from "../middlewares/errorHandler";
import { pad } from "lodash";
import pdf from "html-pdf-node";
import { AbdominalUltrasound } from "../models/AbdominalUltrasound";
import dayjs from "dayjs";

type AbdominalUltrasoundReportType = {
  reportCode: string;
  treatmentDay: string;
  doctorName: string;
  diagostic: string;
  patientName: string;
  ages: string;
  gender: string;
  liver: string;
  gallbladderBiliaryTract: string;
  bladder: string;
  milt: string;
  pancreas: string;
  mucus: string;
  kidney: string;
  other: string;
  finalConclusion: string;
  image: string;
  createdAt: string;
  address: string;
  day: string;
  month: string;
  year: string;
};

export const generateAbdominalUltrasoundReport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { serviceOrderedId } = req.body;
    const foundAbdominalUltrasoundReport: AbdominalUltrasoundReportType | null =
      await AbdominalUltrasound.findOne({
        serviceOrderedId: serviceOrderedId,
      });
    const data: AbdominalUltrasoundReportType = {
      reportCode: foundAbdominalUltrasoundReport?.reportCode!,
      ages: foundAbdominalUltrasoundReport?.ages!,
      gender: foundAbdominalUltrasoundReport?.gender!,
      liver: foundAbdominalUltrasoundReport?.liver!,
      gallbladderBiliaryTract:
        foundAbdominalUltrasoundReport?.gallbladderBiliaryTract!,
      bladder: foundAbdominalUltrasoundReport?.bladder!,
      milt: foundAbdominalUltrasoundReport?.milt!,
      pancreas: foundAbdominalUltrasoundReport?.pancreas!,
      mucus: foundAbdominalUltrasoundReport?.mucus!,
      kidney: foundAbdominalUltrasoundReport?.kidney!,
      other: foundAbdominalUltrasoundReport?.other!,
      finalConclusion: foundAbdominalUltrasoundReport?.finalConclusion!,
      image: foundAbdominalUltrasoundReport?.image!,
      createdAt: foundAbdominalUltrasoundReport?.createdAt!,
      treatmentDay: foundAbdominalUltrasoundReport?.treatmentDay!,
      doctorName: foundAbdominalUltrasoundReport?.doctorName!,
      diagostic: foundAbdominalUltrasoundReport?.diagostic!,
      patientName: foundAbdominalUltrasoundReport?.patientName!,
      address: foundAbdominalUltrasoundReport?.address!,
      day: dayjs(foundAbdominalUltrasoundReport?.createdAt!).format("DD"),
      month: dayjs(foundAbdominalUltrasoundReport?.createdAt!).format("MM"),
      year: dayjs(foundAbdominalUltrasoundReport?.createdAt!).format("YYYY"),
    };
    console.log(foundAbdominalUltrasoundReport);
    if (!foundAbdominalUltrasoundReport) {
      const err: ErrorType = new Error("Abdominal Ultrasound Report not found");
      err.status = 400;
      next(err);
    }
    const templatePath = path.join(
      __dirname,
      "../templates/abdominalUltrasoundTemplate.html"
    );
    const htmlTemplate = await fs.readFile(templatePath, "utf-8");
    const template = Handlebars.compile(htmlTemplate);
    const htmlContent = template(data);
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
