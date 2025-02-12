import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../../middlewares/errorHandler";
import { CoffeStore } from "../models/CoffeStore";
import { getDistance } from "geolib";
import { ImageGallery } from "../../gallery/models/ImageGallery";
import { Menu } from "../../menu/models/Menu";

export const DeleteStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = (req.body.id as string) ?? null;
    if (!id) {
      return res.status(400).json({ message: "Store ID is required." });
    }
    const findStore = await CoffeStore.findById(id);
    let deleteImages;
    let deleteMenu;
    if (findStore) {
      const images = findStore.images;
      const menu = findStore.menu;
      deleteImages = await ImageGallery.deleteMany({ _id: { $in: images } });
      deleteMenu = await Menu.deleteMany({ _id: { $in: menu } });
    }

    const dbResult = await CoffeStore.findByIdAndDelete(id);

    if (!dbResult) {
      return res.status(400).json({
        message: "Failed to delete the store. No result returned.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "SUCCESS",
      body: {
        deletedStore: dbResult,
        deletedImage: deleteImages,
        deletedMenu: deleteMenu,
      },
    });
  } catch (error) {
    const err: ErrorType = new Error("Something went wrong");
    err.status = 400;
    next(error);
    11;
  }
};
