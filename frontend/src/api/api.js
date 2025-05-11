import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  

// Add a new school
export const addSchool = async (schoolData) => {
  try {
    const response = await axios.post(`${API_URL}/addSchool`, schoolData);
    return response.data;
  } catch (error) {
    console.error('Error adding school:', error);
    throw error;
  }
};

// Get all schools

export const getSchools = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${API_URL}/listSchools`, {
        params: { latitude, longitude },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  };
  

// Delete a school by ID
export const deleteSchool = async (id) => {
  try {
    await axios.delete(`${API_URL}/deleteSchool/${id}`);
  } catch (error) {
    console.error('Error deleting school:', error);
    throw error;
  }
};
