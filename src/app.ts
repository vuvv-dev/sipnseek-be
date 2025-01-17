require("dotenv").config();

import { ErrorType } from "./core/middlewares/errorHandler";
import express from "express";
import cors from "cors";
import { errorHandler } from "./core/middlewares/errorHandler";
import { connectDB } from "./external/configurations/mongoContext";
import startRoute from './core/modules/start/routes/startRoute'

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
app.use("/", startRoute);

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
