import express from "express";
import logger from "morgan";
import errorMiddleware from "./utils/errorHandler.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10md", extended: true }));
app.use(logger("tiny"));



app.use(errorMiddleware);

export default app;
