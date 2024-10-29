import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadOptions } from "../routes/welcome";
import { ROLES } from "../setting/constant";
import { ThyroidUltrasound } from "../models/ThyroidUltrasound";
import { ErrorType } from "../middlewares/errorHandler";
import _ from "lodash";
import { CustomRequest } from "../middlewares/veriftyAuthentication";

export const createNewThyroidUltrasound = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const role = req?.user?.role;
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const foundReport = await ThyroidUltrasound.findOne({
      serviceOrderedId: req.body.serviceOrderedId,
    });

    if (foundReport) {
      return res.status(400).json({
        message: "ThyroidUltrasound already exists",
        body: {
          result: foundReport,
        },
      });
    }
    const reqBody = req.body;
    const result = await ThyroidUltrasound.create(reqBody);

    return res.status(200).json({
      message: "ThyroidUltrasound created successfully",
      body: {
        result: result,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};

export const getThyroidUltrasoundByServiceId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const role = req?.user?.role;
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { serviceOrderedId } = req.query;
    const foundReport = await ThyroidUltrasound.findOne({
      serviceOrderedId: serviceOrderedId,
    });
    return res.status(200).json({
      message: "ThyroidUltrasound fetched successfully",
      body: {
        result: foundReport,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
export const updateThyroidUltrasoundByServiceId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const role = req?.user?.role;
    if (role == ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { serviceOrderedId } = req.body;

    const updateData = _.omit(req.body, ["serviceOrderedId"]);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No fields to update.",
      });
    }

    const result = await ThyroidUltrasound.findOneAndUpdate(
      { serviceOrderedId: serviceOrderedId },
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      message: "ThyroidUltrasound updated successfully",
      body: {
        result: result,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
  }
};
