import { ErrorType } from "../../../middlewares/errorHandler";
import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const FindAndDeleteImagesBySecureUrls = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const secureUrls = req.body.secureUrls as string[];

    if (!secureUrls || !Array.isArray(secureUrls) || secureUrls.length === 0) {
      return res.status(400).json({ error: "secureUrls must be a non-empty array" });
    }

    const publicIds = secureUrls.map((secureUrl) => {
      const urlParts = secureUrl.split("/");
      const publicIdWithExtension = urlParts.slice(7).join("/");
      return publicIdWithExtension.replace(/\.[^/.]+$/, ""); 
    });

    const result = await cloudinary.api.delete_resources(publicIds);

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      body: {
        deleted: result.deleted,
        not_found: result.not_found,
      },
    });
    
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(err);
  }
};
