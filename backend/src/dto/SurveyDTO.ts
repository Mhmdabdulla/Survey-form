

// Request DTOs
export interface CreateSurveyDTO {
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
}

export interface GetSurveysQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  gender?: string;
  nationality?: string;
}

// Response DTOs
export interface SurveyListItemDTO {
  id: string;
  name: string;
  email: string;
  gender: string;
  nationality: string;
  submittedAt: string;
  _id: string; // For backward compatibility with frontend
}

export interface SurveyDetailDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  nationality: string;
  address: string;
  message?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  _id: string; // For backward compatibility
}

export interface PaginatedSurveysResponseDTO {
  surveys: SurveyListItemDTO[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface CreateSurveyResponseDTO {
  message: string;
  surveyId: string;
}