import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: String,
  nationality: String,
  email: { type: String, required: true },
  phone: String,
  address: String,
  message: String,
}, { timestamps: true });

export default mongoose.model("Survey", surveySchema);
