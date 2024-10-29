import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadOptions } from "../routes/welcome";
import { ROLES } from "../setting/constant";
import { Electrocardiogram } from "../models/Electrocardiogram";
import { AbdominalUltrasound } from "../models/AbdominalUltrasound";
import { ErrorType } from "../middlewares/errorHandler";
import _ from "lodash";
import { CustomRequest } from "../middlewares/veriftyAuthentication";

export const createNewAbdominalUltrasound = async (
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

    const foundReport = await AbdominalUltrasound.findOne({
      serviceOrderedId: req.body.serviceOrderedId,
    });

    if (foundReport) {
      return res.status(400).json({
        message: "AbdominalUltrasound already exists",
        body: {
          result: foundReport,
        },
      });
    }
    const reqBody = req.body;
    const result = await AbdominalUltrasound.create(reqBody);
    return res.status(200).json({
      message: "AbdominalUltrasound created successfully",
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

export const getAbdominalUltrasoundByServiceId = async (
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
    const foundReport = await AbdominalUltrasound.findOne({
      serviceOrderedId: serviceOrderedId,
    });
    return res.status(200).json({
      message: "AbdominalUltrasound fetched successfully",
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

export const updateAbdominalUltrasoundByServiceId = async (
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

    const result = await AbdominalUltrasound.findOneAndUpdate(
      { serviceOrderedId: serviceOrderedId },
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      message: "AbdominalUltrasound updated successfully",
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

export const deleteAbdominalUltrasoundByServiceId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const role = req?.user?.role;

    if (role === ROLES.USER) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    const result = await AbdominalUltrasound.findOneAndDelete({
      serviceOrderedId: id,
    });

    if (!result) {
      return res.status(404).json({
        message: "AbdominalUltrasound not found",
      });
    }

    return res.status(200).json({
      message: "AbdominalUltrasound deleted successfully",
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
