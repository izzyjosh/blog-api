import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config";
import { Blog } from "../models/blog.model";
import { Tag } from "../models/tag.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.databaseUrl,
  synchronize: true,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  // extra: {
  //   max: 10, // connection pool size (optional)
  // },
  logging: ["error"],
  entities: [Blog, Tag],
  migrations: ["src/migrations/**/*.ts"],
});
