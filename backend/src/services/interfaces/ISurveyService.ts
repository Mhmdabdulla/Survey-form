import {
  CreateSurveyDTO,
  CreateSurveyResponseDTO,      
  GetSurveysQueryDTO,
  PaginatedSurveysResponseDTO,
  SurveyDetailDTO
} from "../../dto/SurveyDTO";

export interface ISurveyService {
  createSurvey(dto: CreateSurveyDTO): Promise<CreateSurveyResponseDTO>;
  getAllSurveys(query: GetSurveysQueryDTO): Promise<PaginatedSurveysResponseDTO>;
  getSurveyById(id: string): Promise<SurveyDetailDTO | null>;
}