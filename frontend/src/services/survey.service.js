import API from "../config/axios";

export const submitSurvey = async (payload) => {
  try {
    const response = await API.post('/surveys', payload);

    return response.data;
  } catch (error) {
    console.error("Login error from service:", error);
    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};
