import { AppDataSource } from "../config/datasource";
import { Repository } from "typeorm";
import { Blog } from "../models/blog.model";
import {
  createBlogResponseSchema,
  CreateBlogResponseDTO,
  CreateBlogDTO,
} from "../schemas/blog.schemas";

class BlogService {
  private blogRepo: Repository<Blog> = AppDataSource.getRepository(Blog);

  async createBlog(blogData: CreateBlogDTO): Promise<CreateBlogResponseDTO> {
    const { tags, ...blogFields } = blogData;
    const blog = this.blogRepo.create({
      ...blogFields,
      ...(tags ? { tags } : {}),
    });
    const savedBlog = await this.blogRepo.save(blog);
    return createBlogResponseSchema.parse(savedBlog);
  }
}

export const blogService = new BlogService();
