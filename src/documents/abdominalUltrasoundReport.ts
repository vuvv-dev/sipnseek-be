import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../middlewares/errorHandler";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadOptions } from "../routes/welcome";

export const generateDocumentDemo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
   const {serviceOrderedId} = req.body;
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
