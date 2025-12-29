import { ISurvey } from "../models/Survey";

export const mapSurveyResponse = (survey: ISurvey) => {
  return {
    id: survey._id,
    name: survey.name,
    gender: survey.gender,
    nationality: survey.nationality,
    email: survey.email,
    phone: survey.phone,
    address: survey.address,
    message: survey.message,
    createdAt: survey.createdAt
  };
};
