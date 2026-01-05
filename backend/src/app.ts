import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import  dotenv from "dotenv";
import cookieParser from "cookie-parser"
import surveyRoutes from "./routes/survey.routes";
import adminRoutes from "./routes/admin.routes";
import { Request, Response, NextFunction } from "express";

const app = express();

dotenv.config();
connectDB();

app.use(
    cors({
    origin:[ "http://localhost:5173","https://survey-form-vert-eight.vercel.app"],
    credentials: true
  })
);
app.use(express.json());      
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/surveys", surveyRoutes);
app.use("/api/admin", adminRoutes);

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  console.error(err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});


export default app;
