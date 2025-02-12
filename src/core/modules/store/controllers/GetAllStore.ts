import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import { CoffeStore } from "../models/CoffeStore";
import { getDistance } from "geolib";

export const GetAllStore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    let filter: any = {};
    let search = req.query.search ? req.query.search.toString() : "";
    search = search.replace(/^"|"$/g, "");

    if (search) {
      const searchRegex = new RegExp(search, "i");
      filter.$or = [{ storename: searchRegex }];
    }

    if (req.query.purpose) {
      filter.purpose = req.query.purpose.toString();
    }

    if (req.query.price) {
      filter.price = req.query.price.toString();
    }

    const distance = req.query.distance ? parseFloat(req.query.distance.toString()) : null;
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
      .slice(skip + limit, skip + limit * 2)
      .filter((store) => !recommendedStores.includes(store));

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
