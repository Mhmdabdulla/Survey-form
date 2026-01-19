import type { Request, Response, NextFunction } from "express";
import { CreateSurveyDTO } from "../../dto/SurveyDTO";

export interface ISurveyController {
  submitSurvey(req: Request<{}, {}, CreateSurveyDTO>, res: Response, next: NextFunction): Promise<Response | void>;
  getAllSurveys(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getSurveyById(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<Response | void>;
}