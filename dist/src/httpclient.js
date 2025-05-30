import axios from "axios";
function handleAxiosError(error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        return new Error(message);
    }
    return new Error('Unexpected Error: ' + (error?.message || String(error)));
}
function getEnvVar(key) {
    return process.env[key];
}
function resolveBaseUrl(base) {
    if (base.startsWith("http"))
        return base + '/';
    const envKey = base.toUpperCase();
    const value = getEnvVar(envKey);
    if (!value) {
        throw new Error(`Base URL "${base}" not found in environment variables.`);
    }
    return value + '/';
}
export const httpClient = {
    get: async (baseUrl, path, config = {}) => {
        try {
            return await axios.get(`${resolveBaseUrl(baseUrl)}${path}`, config);
        }
        catch (error) {
            throw handleAxiosError(error);
        }
    },
    post: (baseUrl, path, data, config = {}) => {
        try {
            return axios.post(`${resolveBaseUrl(baseUrl)}${path}`, data, config);
        }
        catch (error) {
            throw handleAxiosError(error);
        }
    },
    put: (baseUrl, path, data, config = {}) => {
        try {
            return axios.put(`${resolveBaseUrl(baseUrl)}${path}`, data, config);
        }
        catch (error) {
            throw handleAxiosError(error);
        }
    },
    delete: (baseUrl, path, config = {}) => {
        try {
            return axios.delete(`${resolveBaseUrl(baseUrl)}${path}`, config);
        }
        catch (error) {
            throw handleAxiosError(error);
        }
    },
};
