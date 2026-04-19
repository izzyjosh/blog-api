import { NextFunction, Request, Response } from "express";
import { ValidationError, BadRequestError } from "./api.errors";
import { z, ZodType } from "zod";

export const requestSchema = z.object({
  name: z.string().trim().min(1, "name cannot be empty"),
});

export const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      (req as any).validatedBody = parsedData; // Attach validated/sanitized data to request object
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ValidationError("Validation Error", error.issues));
      } else {
        next(error);
      }
    }
  };
};
