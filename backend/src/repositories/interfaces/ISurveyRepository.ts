import { Survey } from "../../entities/Survey";
import { GetSurveysQueryDTO } from "../../dto/SurveyDTO";

export interface ISurveyRepository {
  create(data: Omit<Survey, 'id' | 'createdAt' | 'updatedAt' | 'submittedAt'>): Promise<Survey>;
  findById(id: string): Promise<Survey | null>;
  findAll(query: GetSurveysQueryDTO): Promise<{ surveys: Survey[]; total: number }>;
  count(filter?: any): Promise<number>;
}