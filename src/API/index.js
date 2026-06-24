import axios from 'axios';
import { store } from '../redux/store';
import { URL } from '../constants/URL';

const API_BASE_URL = URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    const state = store.getState();
    const reduxToken = state?.user?.user?.AccessToken;

    if (reduxToken) {
      config.headers.token = reduxToken;
    }

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const getData = async (endpoint, params = {}) => {
  return await api.get(endpoint, { params });
};

export const postData = async (endpoint, body = {}) => {
  return await api.post(endpoint, body);
};

export const putData = async (endpoint, body = {}) => {
  return await api.put(endpoint, body);
};

export const deleteData = async endpoint => {
  return await api.delete(endpoint);
};

export const postDataMultipart = async (endpoint, formData) => {
  return await api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;
