
import { ISurveyRepository } from "../repositories/interfaces/ISurveyRepository";
import {
  CreateSurveyDTO,
  GetSurveysQueryDTO,
  CreateSurveyResponseDTO,
  PaginatedSurveysResponseDTO,
  SurveyListItemDTO,
  SurveyDetailDTO
} from "../dto/SurveyDTO";
import { ISurveyService } from "./interfaces/ISurveyService";
import { SurveyValidator } from "../validators/SurveyValidator";



export class SurveyService implements ISurveyService {
  constructor(private surveyRepository: ISurveyRepository,
              private validator: SurveyValidator,
  ) {}

  async createSurvey(data: CreateSurveyDTO): Promise<CreateSurveyResponseDTO> {
    // Validate using extensible validator
    const validationResult = this.validator.validate(data);
    
    if (!validationResult.isValid) {
      throw new ValidationError(validationResult.errors);
    }


    // Create survey
    const survey = await this.surveyRepository.create(data);

    return {
      message: "Survey submitted successfully",
      surveyId: survey.id
    };
  }

  async getAllSurveys(query: GetSurveysQueryDTO): Promise<PaginatedSurveysResponseDTO> {
    // Set defaults
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, Math.max(1, query.limit || 10)); // Max 100 per page

    const { surveys, total } = await this.surveyRepository.findAll({
      ...query,
      page,
      limit
    });

    // Map to list item DTOs
    const surveyDTOs: SurveyListItemDTO[] = surveys.map(survey => ({
      id: survey.id,
      _id: survey.id,
      name: survey.name,
      email: survey.email,
      gender: survey.gender,
      nationality: survey.nationality,
      submittedAt: survey.submittedAt.toISOString()
    }));

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);

    return {
      surveys: surveyDTOs,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  async getSurveyById(id: string): Promise<SurveyDetailDTO | null> {
    const survey = await this.surveyRepository.findById(id);

    if (!survey) {
      return null;
    }

    return {
      id: survey.id,
      _id: survey.id,
      name: survey.name,
      email: survey.email,
      phone: survey.phone,
      gender: survey.gender,
      nationality: survey.nationality,
      address: survey.address,
      message: survey.message,
      submittedAt: survey.submittedAt.toISOString(),
      createdAt: survey.createdAt.toISOString(),
      updatedAt: survey.updatedAt.toISOString()
    };
  }
}

// Custom error class
export class ValidationError extends Error {
  constructor(public errors: Record<string, string>) {
    super("Validation failed");
    this.name = "ValidationError";
  }
}