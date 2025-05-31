import axios, { AxiosRequestConfig } from "axios";

function handleAxiosError(error: any): Error {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    return new Error(message);
  }
  return new Error('Unexpected Error: ' + (error?.message || String(error)));
}

function getEnvVar(key: string): string | undefined {
  return process.env[key];
}

function resolveBaseUrl(base: string): string {
  if (base.startsWith("http")) return base + '/';

  const envKey = base.toUpperCase();
  const value = getEnvVar(envKey);

  if (!value) {
    throw new Error(`Base URL "${base}" not found in environment variables.`);
  }

  return value + '/';
}

export const httpClient = {
  get: async <T>(
    baseUrl: string,
    path: string = '',
    config: AxiosRequestConfig = {}
  ) => {
    try {
      return await axios.get<T>(`${resolveBaseUrl(baseUrl)}${path}`, config);
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  post: <T>(
    baseUrl: string,
    path: string = '',
    data: any,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      return axios.post<T>(`${resolveBaseUrl(baseUrl)}${path}`, data, config);
    } catch(error) {
      throw handleAxiosError(error);
    }
  },

  put: <T>(
    baseUrl: string,
    path: string = '',
    data: any,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      return axios.put<T>(`${resolveBaseUrl(baseUrl)}${path}`, data, config);
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  delete: <T>(baseUrl: string, path: string = '', config: AxiosRequestConfig = {}) =>{
    try {
      return axios.delete<T>(`${resolveBaseUrl(baseUrl)}${path}`, config);
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
