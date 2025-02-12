import express from "express";
import { DeleteByPublicId } from "../controller/DeleteByPublicId";
import { FindImageBySecureUrl } from "../controller/FindImageBySecureUrl";
import { FindAndDeleteImageBySecureUrl } from "../controller/FindAndDeleteImageBySecureUrl";
import { FindAndDeleteImagesBySecureUrls } from "../controller/FindAndDeleteManyImage";

const Router = express.Router();
Router.route("/delete").delete(DeleteByPublicId);
Router.route("/get").get(FindImageBySecureUrl);
Router.route("/find-and-delete").delete(FindAndDeleteImageBySecureUrl);
Router.route("/find-and-delete-many").delete(FindAndDeleteImagesBySecureUrls);

export default Router;
