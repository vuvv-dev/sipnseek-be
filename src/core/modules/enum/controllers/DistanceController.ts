import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import _ from "lodash";
import { Distance } from "../models/Distance";

export const GetDistances = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const distanceEnumList = await Distance.find().sort({ order: 1 });
    return res.status(200).json({
      message: "SUCCESS",
      body: {
        distance: distanceEnumList.map((distance) =>
          _.omit(distance.toObject(), ["__v"])
        ),
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
