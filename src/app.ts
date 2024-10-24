require("dotenv").config();

import { ErrorType } from "./middlewares/errorHandler";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { connectDB } from "./configurations/mongoContext";

import welcome from "./routes/welcome";
import electrocardiogramRoute from "./routes/electrocardiogramRoute";
import echocardiogramphyRoute from "./routes/echocardiogramphyRoute";
import abdominalUltrasoundRoute from "./routes/abdominalUtrasoundRoute";
import thyroidUltrasoundRoute from "./routes/thyroidUltrasoundRoute";
import demoHtmlToPdf from './routes/demoHtmlToPdf'
import generatePdfRoute from "./routes/generatePdfRoute";
import categoryRoute from "./routes/categoryRoute";
import postRoute from "./routes/postRoute";
import contactRoute from "./routes/contactRoute";
//connect db
connectDB();
//create server
const app = express();
const server = require("http").Server(app);
const port = process.env.APP_PORT || 6060;

app.use(cors());
app.use(express.json());

//routes

//perform endpoint
app.use("/", welcome);
app.use("/api/electrocardiogram", electrocardiogramRoute);
app.use("/api/echocardiogram", echocardiogramphyRoute);
app.use("/api/abdominal-ultrasound", abdominalUltrasoundRoute);
app.use("/api/thyroid-ultrasound", thyroidUltrasoundRoute);
app.use("/api/pdf", demoHtmlToPdf);
app.use("/api/generate-pdf", generatePdfRoute);
app.use("/api/category", categoryRoute);
app.use("/api/post", postRoute);
app.use('/api/contact', contactRoute);

//error caching
app.all("*", (req, res, next) => {
  const err: ErrorType = new Error("Unhandled Route");
  err.statusCode = 404;
  next(err);
});
//error handler
app.use("/api", errorHandler);

server.listen(port, () => {
  console.log(`Server connect to port successfully http://localhost:${port} `);
});
