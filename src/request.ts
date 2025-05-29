import axios, { AxiosRequestConfig } from "axios";

function handleAxiosError(error: any) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    console.error(`Axios Error: ${message}`);
    throw new Error(message);
  }
  console.error("Unexpected Error:", error);
  throw error;
}

function resolveBaseUrl(base: string): string {
  if (base.startsWith("http")) return base;

  const envKey = base.toUpperCase();
  const value =
    typeof import.meta !== "undefined"
      ? import.meta.env?.[envKey]
      : process.env?.[envKey];

  if (!value) {
    throw new Error(`Base URL "${base}" not found in environment variables.`);
  }

  return value;
}

export const request = {
  get: async <T>(
    baseUrl: string,
    path: string,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      return await axios.get<T>(`${resolveBaseUrl(baseUrl)}${path}`, config);
    } catch (error) {
      handleAxiosError(error);
    }
  },

  post: <T>(
    baseUrl: string,
    path: string,
    data: any,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      return axios.post<T>(`${resolveBaseUrl(baseUrl)}${path}`, data, config);
    } catch(error) {
      handleAxiosError(error);
    }
  },

  put: <T>(
    baseUrl: string,
    path: string,
    data: any,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      return axios.put<T>(`${resolveBaseUrl(baseUrl)}${path}`, data, config);
    } catch (error) {
      handleAxiosError(error);
    }
  },

  delete: <T>(baseUrl: string, path: string, config: AxiosRequestConfig = {}) =>{
    try {
      return axios.delete<T>(`${resolveBaseUrl(baseUrl)}${path}`, config);
    } catch (error) {
      handleAxiosError(error);
    }
  },
};
