
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



export class SurveyService implements ISurveyService {
  constructor(private surveyRepository: ISurveyRepository) {}

  async createSurvey(dto: CreateSurveyDTO): Promise<CreateSurveyResponseDTO> {
    // Validate required fields
    if (!dto.name || !dto.gender || !dto.nationality || !dto.email || !dto.phone || !dto.address) {
      throw new Error("All required fields must be filled");
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(dto.email)) {
      throw new Error("Invalid email format");
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(dto.phone)) {
      throw new Error("Invalid phone format");
    }

    // Create survey
    const survey = await this.surveyRepository.create({
      name: dto.name.trim(),
      gender: dto.gender,
      nationality: dto.nationality,
      email: dto.email.toLowerCase().trim(),
      phone: dto.phone.trim(),
      address: dto.address.trim(),
      message: dto.message?.trim()
    });

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