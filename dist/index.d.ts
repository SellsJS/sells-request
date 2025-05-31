import * as axios from 'axios';
import { AxiosRequestConfig } from 'axios';

declare const httpClient: {
    get: <T>(baseUrl: string, path?: string, config?: AxiosRequestConfig) => Promise<axios.AxiosResponse<T, any>>;
    post: <T>(baseUrl: string, path: string | undefined, data: any, config?: AxiosRequestConfig) => Promise<axios.AxiosResponse<T, any>>;
    put: <T>(baseUrl: string, path: string | undefined, data: any, config?: AxiosRequestConfig) => Promise<axios.AxiosResponse<T, any>>;
    delete: <T>(baseUrl: string, path?: string, config?: AxiosRequestConfig) => Promise<axios.AxiosResponse<T, any>>;
};

export { httpClient };
