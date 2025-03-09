// utils/fetchProvider.ts
import axios, { AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Customize the API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async <T>(url: string, params = {}): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.get(url, { params });
  return response.data;
};

export const post = async <T>(url: string, data: any): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(url, data);
  return response.data;
};

// Add more methods as needed (put, delete, etc.)
