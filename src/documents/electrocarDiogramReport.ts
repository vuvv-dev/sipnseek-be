import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import path from "path";
import { ErrorType } from "../middlewares/errorHandler";
import { pad } from "lodash";
import pdf from "html-pdf-node";
import { AbdominalUltrasound } from "../models/AbdominalUltrasound";
import dayjs from "dayjs";
import { Electrocardiogram } from "../models/Electrocardiogram";

type ElectrocardiogramType = {
  reportCode: string;
  treatmentDay: string;
  doctorName: string;
  diagostic: string;
  patientName: string;
  ages: string;
  gender: string;
  image: string;
  sampleTransfer: string | null;
  heartRate: string | null;
  frequency: number | null;
  heartPosition: string | null;
  axis: string | null;
  corner: string | null;
  waveP: string | null;
  intervalPR: string | null;
  qrs: string | null;
  ST: string | null;
  waveT: string | null;
  intervalQT: string | null;
  precordialLeads: string | null;
  finalConclusion: string | null;
  createdAt: string;
  address: string;
  day: string;
  month: string;
  year: string;

};

export const generateElectrocarDiogramReport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { serviceOrderedId } = req.body;
    const foundElectrocarDiogramReport: any = await Electrocardiogram.findOne({
      serviceOrderedId: serviceOrderedId,
    });
    const data: ElectrocardiogramType = {
      reportCode: foundElectrocarDiogramReport?.reportCode!,
      treatmentDay: foundElectrocarDiogramReport?.treatmentDay!,
      ages: foundElectrocarDiogramReport?.ages!,
      gender: foundElectrocarDiogramReport?.gender!,
      diagostic: foundElectrocarDiogramReport?.diagostic!,
      doctorName: foundElectrocarDiogramReport?.doctorName!,
      patientName: foundElectrocarDiogramReport?.patientName!,
      image: foundElectrocarDiogramReport?.image!,
      address: foundElectrocarDiogramReport?.address!,
      axis: foundElectrocarDiogramReport?.axis!,
      corner: foundElectrocarDiogramReport?.corner!,
      sampleTransfer: foundElectrocarDiogramReport?.sampleTransfer!,
      heartRate: foundElectrocarDiogramReport?.heartRate!,
      frequency: foundElectrocarDiogramReport?.frequency!,
      finalConclusion: foundElectrocarDiogramReport?.finalConclusion!,
      heartPosition: foundElectrocarDiogramReport?.heartPosition!,
      intervalPR: foundElectrocarDiogramReport?.intervalPR!,
      intervalQT: foundElectrocarDiogramReport?.intervalQT!,
      precordialLeads: foundElectrocarDiogramReport?.precordialLeads!,
      qrs: foundElectrocarDiogramReport?.qrs!,
      ST: foundElectrocarDiogramReport?.ST!,
      waveP: foundElectrocarDiogramReport?.waveP!,
      waveT: foundElectrocarDiogramReport?.waveT!,
      createdAt: foundElectrocarDiogramReport?.createdAt,
      day: dayjs(foundElectrocarDiogramReport?.createdAt!).format("DD"),
      month: dayjs(foundElectrocarDiogramReport?.createdAt!).format("MM"),
      year: dayjs(foundElectrocarDiogramReport?.createdAt!).format("YYYY"),
    };

    if (!foundElectrocarDiogramReport) {
      const err: ErrorType = new Error("Electrocardiogram Report not found");
      err.status = 400;
      next(err);
    }
    const templatePath = path.join(
      __dirname,
      "../templates/electroDiogramTemplate.html"
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
