import express from "express";
const Router = express.Router();
import { getAllPost, getPostBySlug, deletePost, createPost, updatePost, getPostById, getAllActivePost, getAllNewPost, getRelatedPosts } from "../controllers/PostController";
import { verifyAuthentication } from "../middlewares/veriftyAuthentication";

Router.route("/create").post(verifyAuthentication, createPost);
Router.route("/get").get(verifyAuthentication,getAllPost);
Router.route("/update").patch(verifyAuthentication ,updatePost);
Router.route('/delete/:id').delete(verifyAuthentication ,deletePost);
Router.route('/get/:slug').get(getPostBySlug);
Router.route('/getById/:id').get(verifyAuthentication,getPostById);
Router.route('/get-active').get(getAllActivePost);
Router.route('/get-new-posts').get(getAllNewPost);
Router.route('/get-relate-posts/:slug').get(getRelatedPosts);
export default Router;
