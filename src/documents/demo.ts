import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Document, Packer, Paragraph, TextRun } from "docx";
import mammoth from "mammoth";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import puppeteer from "puppeteer";

export const generateDocumentDemo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const data = {
    name: "Vo Van Vu",
    phoneNumber: "0356611341",
  };

  try {
    const templatePath = path.join(process.cwd(), "public/files", "hello.docx");
    const templateBuffer = fs.readFileSync(templatePath);
    const zip = new PizZip(templateBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.render(data);

    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    const fileName = `document-${Date.now()}.docx`;

    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.send(buffer);

  } catch (error) {
    console.error("Error generating document:", error);
    return res.status(500).json({ error: "Failed to generate document" });
  }
};
