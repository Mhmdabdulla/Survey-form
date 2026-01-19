// src/repositories/SurveyRepository.ts
import { SurveyModel, ISurveyDocument } from "../models/Survey";
import { Survey } from "../entities/Survey";
import { GetSurveysQueryDTO } from "../dto/SurveyDTO";
import { ISurveyRepository } from "./interfaces/ISurveyRepository";



export class SurveyRepository implements ISurveyRepository {
  async create(data: Omit<Survey, 'id' | 'createdAt' | 'updatedAt' | 'submittedAt'>): Promise<Survey> {
    const survey = await SurveyModel.create(data);
    return this.toEntity(survey);
  }

  async findById(id: string): Promise<Survey | null> {
    const survey = await SurveyModel.findById(id);
    return survey ? this.toEntity(survey) : null;
  }

  async findAll(query: GetSurveysQueryDTO): Promise<{ surveys: Survey[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      gender,
      nationality
    } = query;

    // Build filter object
    const filter: any = {};

    // Search filter (name or email)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Gender filter
    if (gender) {
      filter.gender = gender;
    }

    // Nationality filter
    if (nationality) {
      filter.nationality = nationality;
    }

    // Calculate skip
    const skip = (page - 1) * limit;

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const [surveys, total] = await Promise.all([
      SurveyModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      SurveyModel.countDocuments(filter)
    ]);

    return {
      surveys: surveys.map(s => this.toEntity(s as any)),
      total
    };
  }

  async count(filter: any = {}): Promise<number> {
    return await SurveyModel.countDocuments(filter);
  }

  private toEntity(doc: ISurveyDocument): Survey {
    return {
      id: doc._id.toString(),
      name: doc.name,
      gender: doc.gender,
      nationality: doc.nationality,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      message: doc.message,
      submittedAt: doc.createdAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}