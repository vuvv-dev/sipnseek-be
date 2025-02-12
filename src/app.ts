import dotenv from "dotenv";

dotenv.config();

import { ErrorType } from "./core/middlewares/errorHandler";
import express from "express";
import cors from "cors";
import { errorHandler } from "./core/middlewares/errorHandler";
import { connectDB } from "./external/configurations/mongoContext";

import startRoute from "./core/modules/start/routes/startRoute";
import PriceRoute from "./core/modules/enum/routes/PriceRoute";
import DistanceRoute from "./core/modules/enum/routes/DistanceRoute";
import PurposeRoute from "./core/modules/enum/routes/PurposeRoute";
import CoffeeStoreRoute from "./core/modules/store/routes/CoffeeStoreRoute";
import ImageGalleryRoute from "./core/modules/gallery/routes/ImageGalleryRoute";
import MenuRoute from "./core/modules/menu/routes/MenuRoute";
import CloudinaryRoute from "./core/modules/cloudinary/routes/CloudinaryRoute";

//connect db
connectDB();
//create server
const app = express();
const server = require("http").Server(app);
const port = process.env.APP_PORT || 6060;

app.use(cors());
app.use(express.json());

//routes
const prefix = "/api/v1";
//perform endpoint
app.use("/", startRoute);

app.use(prefix + "/prices", PriceRoute);
app.use(prefix + "/distances", DistanceRoute);
app.use(prefix + "/purposes", PurposeRoute);

app.use(prefix + "/store", CoffeeStoreRoute);
app.use(prefix + "/gallery", ImageGalleryRoute);
app.use(prefix + "/menu", MenuRoute);

app.use(prefix + "/cloudinary", CloudinaryRoute);

//error caching
app.all("*", (req, res, next) => {
  const err: ErrorType = new Error("Unhandled Route");
  err.statusCode = 404;
  next(err);
});
//error handler
app.use("/api/v1", errorHandler);

server.listen(port, () => {
  console.log(`Server connect to port successfully http://localhost:${port} `);
});
