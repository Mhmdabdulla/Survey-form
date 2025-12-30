import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';



export const adminLogin = async (
  name, password
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/login`,
      { name, password },
      {
        withCredentials: true 
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Invalid credentials'
      );
    }
    throw new Error('Login failed');
  }
};


export const fetchSurveys = async () => {
  const res = await axios.get(`${API_BASE_URL}/surveys`);
  console.log(res.data);
  return res.data;
};