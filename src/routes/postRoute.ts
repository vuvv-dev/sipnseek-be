import express from "express";
const Router = express.Router();
import { getAllPost, getPostBySlug, deletePost, createPost, updatePost, getPostById, getAllActivePost, getAllNewPost, getRelatedPosts } from "../controllers/PostController";

Router.route("/create").post(createPost);
Router.route("/get").get(getAllPost);
Router.route("/update").patch(updatePost);
Router.route('/delete/:id').delete(deletePost);
Router.route('/get/:slug').get(getPostBySlug);
Router.route('/getById/:id').get(getPostById);
Router.route('/get-active').get(getAllActivePost);
Router.route('/get-new-posts').get(getAllNewPost);
Router.route('/get-relate-posts/:slug').get(getRelatedPosts);
export default Router;
