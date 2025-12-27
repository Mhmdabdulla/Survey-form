import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import  dotenv from "dotenv";
import cookieParser from "cookie-parser"
// import surveyRoutes from "./routes/survey.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());      
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// app.use("/api/surveys", surveyRoutes);
app.use("/api/admin", adminRoutes);

export default app;
