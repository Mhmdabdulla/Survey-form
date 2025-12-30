import axios from 'axios';



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const submitSurvey = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/surveys`,
      payload,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    // Axios error handling
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Failed to submit survey';

      throw new Error(message);
    }

    throw new Error('Something went wrong while submitting the survey');
  }
};
