import { Request, Response, NextFunction } from "express";
import { blogService } from "../services/blog.services";
import { successResponse } from "../utils/responses";
import {
  CreateBlogResponseDTO,
  UpdateBlogResponseDTO,
} from "../schemas/blog.schemas";

class BlogController {
  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const body = (req as any).validatedBody; // Get validated data from request object
      const blog = await blogService.createBlog(body);
      res.status(201).json(
        successResponse<CreateBlogResponseDTO>({
          message: "Blog created successfully",
          data: blog,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = (req as any).params;
      const body = (req as any).validatedBody;
      const blog = await blogService.updateBlog(id, body);
      res.status(200).json(
        successResponse<UpdateBlogResponseDTO>({
          message: "Blog updated successfully",
          data: blog,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}

export const blogController = new BlogController();
