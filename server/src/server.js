import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import originOptions from "./configs/origins.js";
import indexRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

import { connectDB } from "./configs/database.js";

dotenv.config();

const app = express();
const PORT = 5000;

connectDB().then(() => {
  app.use(cors(originOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.get("/", (req, res) => {
    res.send("<h1> Hello World </h1>");
  });
  app.use("/api", indexRouter);
  app.listen(PORT, () => {
    console.log("server is running on port ", PORT);
  });
});
