import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  HF_TOKEN: process.env.HF_TOKEN,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
};
