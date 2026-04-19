import { AppDataSource } from "../config/datasource";
import { Repository } from "typeorm";
import { Blog } from "../models/blog.model";
import { NotFoundError, ValidationError } from "../utils/api.errors";
import {
  createBlogResponseSchema,
  CreateBlogResponseDTO,
  CreateBlogDTO,
  updateBlogResponseSchema,
  UpdateBlogDTO,
  UpdateBlogResponseDTO,
} from "../schemas/blog.schemas";
import { Tag } from "../models/tag.model";

class BlogService {
  private blogRepo: Repository<Blog> = AppDataSource.getRepository(Blog);
  private tagRepo: Repository<Tag> = AppDataSource.getRepository(Tag);

  private async normalizeTags(tags: NonNullable<UpdateBlogDTO["tags"]>) {
    return Promise.all(
      tags.map(async (tag) => {
        // If tag already exists → reuse it
        if (tag.id) {
          const existing = await this.tagRepo.findOneBy({ id: tag.id });

          if (!existing) {
            throw new NotFoundError(`Tag not found: ${tag.id}`);
          }

          return existing;
        }

        // If no id → create new tag safely
        if (!tag.name) {
          throw new ValidationError("Validation Error", [
            {
              field: "tags",
              msg: "Tag name is required when id is not provided",
            },
          ]);
        }

        return this.tagRepo.create({
          name: tag.name,
        });
      }),
    );
  }

  async createBlog(blogData: CreateBlogDTO): Promise<CreateBlogResponseDTO> {
    const { tags, ...blogFields } = blogData;
    const blog = this.blogRepo.create({
      ...blogFields,
      ...(tags ? { tags } : {}),
    });
    const savedBlog = await this.blogRepo.save(blog);
    return createBlogResponseSchema.parse(savedBlog);
  }

  async updateBlog(
    id: string,
    blogData: UpdateBlogDTO,
  ): Promise<UpdateBlogResponseDTO> {
    const blog = await this.blogRepo.findOne({
      where: { id },
      relations: ["tags"], // include relations you might update
    });

    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    const { tags, ...rest } = blogData;

    // 1. Update only scalar fields safely
    Object.assign(blog, rest);

    // 2. Handle tags separately (important for relational integrity)
    if (tags !== undefined) {
      blog.tags = await this.normalizeTags(tags);
    }

    const saved = await this.blogRepo.save(blog);

    return updateBlogResponseSchema.parse(saved);
  }
}

export const blogService = new BlogService();
