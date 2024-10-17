import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import path from "path";
import { ErrorType } from "../middlewares/errorHandler";
import { pad } from "lodash";
import pdf from 'html-pdf-node';

export const generateDocumentHtmlToPdfDemo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const patientName = "Vo Van Vu";
    const age = 29;
    const gender = "male";
    const address = "Ha Noi";
    const diagnosis = "Diabetes";
    const imageUrl =
      "https://i.ibb.co/NK8QP33/03ebd625cc0b9d636256ecc44c0ea324.jpg";
    const additionalInfo = [
      { name: "Chiều cao", value: "170 cm" },
      { name: "Cân nặng", value: "70 kg" },
      { name: "Nhóm máu", value: "A" },
    ];

    const templatePath = path.join(__dirname, "../templates/document.html");
    const htmlTemplate = await fs.readFile(templatePath, "utf-8");

    const template = Handlebars.compile(htmlTemplate);
    const htmlContent = template({
      patientName,
      age,
      gender,
      address,
      diagnosis,
      additionalInfo,
      imageUrl,
    });

    const file = { content: htmlContent };
    const pdfBuffer = await pdf.generatePdf(file, { format: 'A4' });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="document.pdf"');
    res.end(pdfBuffer);
  } catch (error) {
    console.error("Detailed Error:", error);
    const err: ErrorType = new Error(
      "Something went wrong while generating the PDF"
    );
    err.status = 400;
    next(err);
  }
};
