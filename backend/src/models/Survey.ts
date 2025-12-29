import { Schema, model, Document } from "mongoose";

export interface ISurvey extends Document {
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const surveySchema = new Schema<ISurvey>(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String }
  },
  { timestamps: true }
);

export const Survey = model<ISurvey>("Survey", surveySchema);
