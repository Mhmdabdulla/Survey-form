
import API from "../config/axios";

export const submitSurvey = async (payload) => {
  try {
    const response = await API.post('/surveys', payload);
    return response.data;
  } catch (error) {
    console.error("Submit survey error:", error);
    const errorMessage = error.response?.data?.message || "Failed to submit survey. Please try again.";
    throw new Error(errorMessage);
  }
};