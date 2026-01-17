
import type { Request, Response, NextFunction } from "express";
import { ISurveyService } from "../services/interfaces/ISurveyService";
import { CreateSurveyDTO, GetSurveysQueryDTO } from "../dto/SurveyDTO";
import { ISurveyController } from "./interfaces/ISurveyController";



export class SurveyController implements ISurveyController {
  constructor(private surveyService: ISurveyService) {}

  submitSurvey = async (
    req: Request<{}, {}, CreateSurveyDTO>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    console.log("Received survey submission:", req.body);
    
    try {
      const result = await this.surveyService.createSurvey(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === "All required fields must be filled" ||
          error.message === "Invalid email format" ||
          error.message === "Invalid phone format"
        ) {
          return res.status(400).json({ message: error.message });
        }
      }
      next(error);
    }
  };

  getAllSurveys = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const query: GetSurveysQueryDTO = {
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        search: req.query.search as string,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as 'asc' | 'desc',
        gender: req.query.gender as string,
        nationality: req.query.nationality as string
      };

      const result = await this.surveyService.getAllSurveys(query);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getSurveyById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const survey = await this.surveyService.getSurveyById(req.params.id);

      if (!survey) {
        return res.status(404).json({ message: "Survey not found" });
      }

      return res.status(200).json(survey);
    } catch (error) {
      next(error);
    }
  };
}