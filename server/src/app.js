import express from "express";
import logger from "morgan";
import errorMiddleware from "./utils/errorHandler.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { notFound } from "./utils/response.utils.js";
import cors from "cors";
import config from "./config/config.js";

const app = express();

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(logger("tiny"));
app.use(cookieParser());

app.use("/api/v1", Router);

app.use((req, res) => {
  return notFound(res, {
    ip: req.ip,
    method: req.method,
    url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
  });
});

app.use(errorMiddleware);

export default app;
