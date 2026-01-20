
import API from "../config/axios";

/**
 * Admin login with email
 */
export const adminLogin = async (email, password) => {
  try {
    const response = await API.post('/admin/login', { email, password });
    console.log("Admin login response:", response);
    return response.data; // Success: returns { token, admin }
  } catch (error) {
    console.error("Login error from service:", error);
    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch surveys with pagination, search, sorting, and filtering
 */
export const fetchSurveys = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.gender) queryParams.append('gender', params.gender);
    if (params.nationality) queryParams.append('nationality', params.nationality);

    const response = await API.get(`/surveys?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Fetch surveys error:", error);
    const errorMessage = error.response?.data?.message || "Failed to fetch surveys.";
    throw new Error(errorMessage);
  }
};

/**
 * Fetch a single survey by ID
 */
export const fetchSurveyById = async (id) => {
  try {
    const response = await API.get(`/surveys/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fetch survey error:", error);
    const errorMessage = error.response?.data?.message || "Failed to fetch survey details.";
    throw new Error(errorMessage);
  }
};