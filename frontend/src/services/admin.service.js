import API from "../config/axios";



export const adminLogin = async (name, password) => {
  try {
    const response = await API.post('/admin/login', { name, password });
    console.log("Admin login response:", response);
    return response.data; // Success: returns { token, admin }
  } catch (error) {

    console.error("Login error from service:", error);
    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};


export const fetchSurveys = async () => {
  const res = await API.get('/surveys');
  return res.data;
};