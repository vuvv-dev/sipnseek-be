import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import path from "path";
import { ErrorType } from "../middlewares/errorHandler";
import { pad } from "lodash";

// Hàm để tạo file PDF
export const generateDocumentHtmlToPdfDemo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Lấy dữ liệu từ request body (JSON với các thông tin như name, age, v.v.)
    // const { patientName, age, gender, address, diagnosis } = req.body;
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

    // Đọc file HTML template
    const templatePath = path.join(__dirname, "../templates/document.html"); // Đường dẫn đến file HTML
    console.log(templatePath);
    const htmlTemplate = await fs.readFile(templatePath, "utf-8");
    // Sử dụng Handlebars để xử lý các placeholder
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

    // Tạo trình duyệt Puppeteer và chuyển đổi HTML thành PDF
    const browser = await puppeteer.launch({
      headless: "shell",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      timeout: 60000,
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "load" });

    // Tạo PDF từ nội dung HTML
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // Đóng trình duyệt
    await browser.close();

    // Ghi log kết quả để kiểm tra buffer PDF

    // Thiết lập header cho response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="document.pdf"');

    // Gửi buffer PDF về cho client
    res.end(pdfBuffer); // Sử dụng res.end() để gửi trực tiếp buffer PDF
  } catch (error) {
    console.error("Detailed Error:", error);
    const err: ErrorType = new Error(
      "Something went wrong while generating the PDF"
    );
    err.status = 400;
    next(err);
  }
};
