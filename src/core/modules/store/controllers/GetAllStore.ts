import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import { CoffeStore } from "../models/CoffeStore";
import { getDistance } from "geolib";
import mongoose from "mongoose";

export const GetAllStore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const skip = (page - 1) * limit;

    let filter: any = {};
    let search = req.query.search ? req.query.search.toString() : "";
    search = search.replace(/^"|"$/g, "");

    if (search) {
      const searchRegex = new RegExp(search, "i");
      filter.$or = [
        { storename: searchRegex },
        {
          address: searchRegex,
        },
        {
          description: searchRegex,
        },
      ];
    }

    if (req.query.purpose) {
      const purposeName = req.query.purpose.toString();
      const purpose = await mongoose
        .model("Purpose")
        .findOne({ value: purposeName })
        .select("_id");

      if (purpose) {
        filter.purposeTag = { $in: [purpose._id] };
      } else {
        console.error(`Purpose not found: ${purposeName}`);
      }
    }

    if (req.query.price) {
      const priceName = req.query.price.toString();
      const price = await mongoose.model("Price").findOne({ value: priceName }).select("_id")
      if (price) {
        filter.priceTag = { $in: [price._id] };
      }  else {
        console.log(`Price not found: ${priceName}`);
      }
    }

    const distance = req.query.distance
      ? parseFloat(req.query.distance.toString())
      : null;
    const userLat = req.query.lat ? parseFloat(req.query.lat.toString()) : null;
    const userLng = req.query.lng ? parseFloat(req.query.lng.toString()) : null;

    let allStores = await CoffeStore.find(filter)
      .sort({ createdAt: -1 })
      .populate("priceTag")
      .populate("purposeTag")
      .populate("images")
      .populate("menu")
      .exec();

    if (distance && userLat !== null && userLng !== null) {
      allStores = allStores.filter((store: any) => {
        const storeLat = store.addressGoogle.latitude;
        const storeLng = store.addressGoogle.longitude;

        if (!storeLat || !storeLng) return false;

        const calculatedDistance = getDistance(
          { latitude: userLat, longitude: userLng },
          { latitude: storeLat, longitude: storeLng }
        );

        return calculatedDistance / 1000 <= distance;
      });
    }

    const totalStores = allStores.length;

    const recommendedStores = allStores.slice(skip, skip + limit);
    const relatedStores = allStores
      .filter((store) => !recommendedStores.includes(store))
      .slice(0, limit)
      .sort(() => Math.random() - 0.5);

    return res.status(200).json({
      message: "SUCCESS",
      body: {
        total: totalStores,
        currentPage: page,
        totalPages: Math.ceil(totalStores / limit),
        recommended: recommendedStores,
        related: relatedStores,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(err);
  }
};
