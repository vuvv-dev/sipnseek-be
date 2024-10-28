import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import _ from "lodash";
import { ErrorType } from "../middlewares/errorHandler";
import { Electrocardiogram } from "../models/Electrocardiogram";
import { JwtPayloadOptions } from "../routes/welcome";
import { ROLES } from "../setting/constant";
import { CustomRequest } from "../middlewares/veriftyAuthentication";

export const createNewElectrocardiogram = async (
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

    const foundReport = await Electrocardiogram.findOne({
      serviceOrderedId: req.body.serviceOrderedId,
    });

    if (foundReport) {
      return res.status(400).json({
        message: "Electrocardiogram already exists",
        body: {
          result: foundReport,
        },
      });
    }
    const reqBody = req.body;
    const result = await Electrocardiogram.create(reqBody);

    return res.status(200).json({
      message: "Electrocardiogram created successfully",
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

export const getElectrocardiogramByServiceId = async (
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
    const foundReport = await Electrocardiogram.findOne({
      serviceOrderedId: serviceOrderedId,
    });
    return res.status(200).json({
      message: "Electrocardiogram fetched successfully",
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
export const updateElectrocardiogramByServiceId = async (
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

    const result = await Electrocardiogram.findOneAndUpdate(
      { serviceOrderedId: serviceOrderedId },
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      message: "Electrocardiogram updated successfully",
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

export const deleteElectrocardiogramByServiceId = async (
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

    const result = await Electrocardiogram.findOneAndDelete({
      serviceOrderedId: id,
    });

    if (!result) {
      return res.status(404).json({
        message: "Electrocardiogram not found",
      });
    }

    return res.status(200).json({
      message: "Electrocardiogram deleted successfully",
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
