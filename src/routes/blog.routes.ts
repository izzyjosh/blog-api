import { Router } from "express";
import { blogController } from "../controllers/blog.controllers";
import { validateRequest } from "../utils/validate-request";
import { CreateBlogDTO, createBlogSchema } from "../schemas/blog.schemas";

export const blogRouter = Router();

blogRouter.post("/", validateRequest(createBlogSchema), (req, res, next) =>
  blogController.createBlog(req, res, next),
);
