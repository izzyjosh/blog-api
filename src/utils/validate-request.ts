import { NextFunction, Request, Response } from "express";
import { ValidationError, BadRequestError } from "./api.errors";
import { z, ZodType } from "zod";

export const requestSchema = z.object({
  name: z.string().trim().min(1, "name cannot be empty"),
});

export const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      (req as any).validatedBody = req.body; // Attach validated data to request object
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        next(new ValidationError(error.message, error.errors));
      } else {
        next(error);
      }
    }
  };
};
