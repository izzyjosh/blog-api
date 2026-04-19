import express from "express";
import sysLogger, { httpLogger } from "./utils/logger";
import {
  NotFoundErrorHandler,
  RequestErrorHandler,
} from "./middlewares/errors.handlers";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import { config } from "./config/config";
import { AppDataSource } from "./config/datasource";
import { successResponse, ISuccess } from "./utils/responses";
import { blogRouter } from "./routes/blog.routes";

const port = config.port;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  }),
);

app.use(httpLogger);

app.use("/api/blogs", blogRouter);
app.get("/", (req, res) => {
  const response: ISuccess<undefined> = {
    status: "success",
    message: "Welcome to the Blog API Service!",
  };
  res.status(StatusCodes.OK).json(successResponse(response));
});

// Error handlers middlewares
app.use(NotFoundErrorHandler);
app.use(RequestErrorHandler);

(async () => {
  try {
    await AppDataSource.initialize();
    sysLogger.info("Database connection established successfully");
    app.listen(port, () => {
      sysLogger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    sysLogger.error(`Failed to initialize database connection ${error}`);
    process.exit(1);
  }
})();
