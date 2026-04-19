import { Router } from "express";
import { blogController } from "../controllers/blog.controllers";
import { validateRequest } from "../utils/validate-request";
import { createBlogSchema, updateBlogSchema } from "../schemas/blog.schemas";

export const blogRouter = Router();

blogRouter.post("/", validateRequest(createBlogSchema), (req, res, next) =>
  blogController.createBlog(req, res, next),
);

blogRouter.put("/:id", validateRequest(updateBlogSchema), (req, res, next) =>
  blogController.updateBlog(req, res, next),
);
