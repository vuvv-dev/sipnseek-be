import { Request, Response, NextFunction } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import _ from "lodash";
import { Purpose } from "../models/Purpose";

export const GetPurpose = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const purposeEnumList = await Purpose.find().sort({ order: 1 });

    return res.status(200).json({
      message: "SUCCESS",
      body: {
        purposes: purposeEnumList.map((purpose) => {
          return _.omit(purpose.toObject(), ["__v"]);
        }),
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
