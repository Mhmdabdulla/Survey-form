// src/models/Survey.ts
import { Schema, model, Document } from "mongoose";

export interface ISurveyDocument extends Document {
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

const surveySchema = new Schema<ISurveyDocument>(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String }
  },
  { timestamps: true }
);

// Indexes for better search performance
surveySchema.index({ name: 'text', email: 'text' });
surveySchema.index({ createdAt: -1 });
surveySchema.index({ gender: 1 });
surveySchema.index({ nationality: 1 });

export const SurveyModel = model<ISurveyDocument>("Survey", surveySchema);