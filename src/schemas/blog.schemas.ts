import { z } from "zod";

// ======== create blog schema ========
export const createBlogSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty"),
  content: z.string().trim().min(1, "Content cannot be empty"),
  category: z.string().trim().min(1, "Category cannot be empty"),
  tags: z
    .array(
      z.object({ name: z.string().trim().min(1, "Tag name cannot be empty") }),
    )
    .optional(),
  author: z.string().trim().min(1, "Author cannot be empty"),
});

export type CreateBlogDTO = z.infer<typeof createBlogSchema>;

// ======== create blog response schema ========
export const createBlogResponseSchema = createBlogSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateBlogResponseDTO = z.infer<typeof createBlogResponseSchema>;
