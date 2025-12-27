import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import * as dotenv from "dotenv";

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

export default app;
