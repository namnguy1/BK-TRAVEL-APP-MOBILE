// api.js

import axios from 'axios';

const ipv4Address = '172.17.24.174'
const BASE_URL = `http://${ipv4Address}:8080`;

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
    const response = await axios.get(`${BASE_URL}/api/v1/tour/all/online`)
    return response.data;
  } catch (error) {
    throw error;
  }

}