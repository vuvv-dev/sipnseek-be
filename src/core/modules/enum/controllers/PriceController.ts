import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import { Price } from "../models/Price";
import _ from "lodash";
export const GetPrices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const pricesEnumList = await Price.find().sort({ order: 1 });

    return res.status(200).json({
      message: "SUCCESS",
      body: {
        prices: pricesEnumList.map((price) =>
          _.omit(price.toObject(), ["__v"])
        ),
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
