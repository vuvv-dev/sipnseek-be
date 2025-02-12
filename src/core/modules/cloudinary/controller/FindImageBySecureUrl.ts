import { ErrorType } from "../../../middlewares/errorHandler";
import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const FindImageBySecureUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const secureUrl = req.query.secureUrl as string;

    if (!secureUrl) {
      return res.status(400).json({ error: "secure_url is required" });
    }

    const urlParts = secureUrl.split("/");
    const publicIdWithExtension = urlParts.slice(7).join("/");
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

    const imageInfo = await cloudinary.api.resource(publicId);

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      body: {
        image: imageInfo,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(err);
  }
};
