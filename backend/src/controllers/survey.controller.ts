import type { Request, Response } from "express";
import { Survey } from "../models/Survey";
import { mapSurveyResponse } from "../mappers/survey.mapper";


interface SurveyRequestBody {
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
}

export const submitSurvey = async (
  req: Request<{}, {}, SurveyRequestBody>,
  res: Response
) => {
    console.log("Received survey submission:", req.body);
  try {
    const {
      name,
      gender,
      nationality,
      email,
      phone,
      address,
      message
    } = req.body;

    // Basic validation
    if (!name || !gender || !nationality || !email || !phone || !address) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    const survey = await Survey.create({
      name,
      gender,
      nationality,
      email,
      phone,
      address,
      message
    });

    return res.status(201).json({
      message: "Survey submitted successfully",
      surveyId: survey._id
    });
  } catch (error) {
    console.error("Error submitting survey:", error);
    return res.status(500).json({
      message: "Failed to submit survey"
    });
  }
};


export const getAllSurveys = async (
  req: Request,
  res: Response
) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });

    const mappedSurveys = surveys.map(mapSurveyResponse);

    return res.status(200).json({
      total: surveys.length,
      surveys:mappedSurveys
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return res.status(500).json({
      message: "Failed to fetch surveys"
    });
  }
};
