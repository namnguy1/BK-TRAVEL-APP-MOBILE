// api.js

import axios from 'axios';

const ipv4Address = '172.17.30.96'
export const BASE_URL = `http://${ipv4Address}:8080`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
      email: email,
      password: password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getOnlineTour = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/tours/all/online`)
    console.log('data: ', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }

}

export const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
};
