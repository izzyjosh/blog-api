import { StatusCodes } from "http-status-codes";

export default class ApiError extends Error {
  public status = "error";
  constructor(
    public message: string,
    public statusCode: number,
    public errors: Array<unknown>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request", errors: Array<unknown> = []) {
    super(message, StatusCodes.BAD_REQUEST, errors);
  }
}

export class NotFoundError extends ApiError {
  constructor(
    message: string = "Resource not found",
    errors: Array<unknown> = [],
  ) {
    super(message, StatusCodes.NOT_FOUND, errors);
  }
}

export class InternalServerError extends ApiError {
  constructor(
    message: string = "Internal Server Error",
    errors: Array<unknown> = [],
  ) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, errors);
  }
}

export class ValidationError extends ApiError {
  constructor(
    message: string = "Validation Error",
    errors: Array<unknown> = [],
  ) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY, errors);
  }
}
