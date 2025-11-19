import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from 'axios';

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use((response) => response, (error) => {
      console.error('Request Error:', error.response?.data || error.message);
      return Promise.reject(error);
    });
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig):
      Promise<T> {
    const response: AxiosResponse<T> =
        await this.instance.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig):
      Promise<T> {
    const response: AxiosResponse<T> =
        await this.instance.put(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }
}

const BASE_URL =
    import.meta.env.VITE_API_BASE || 'https://blog-api.charlie-cloud.me/api';

const http = new HttpClient(BASE_URL);
export default http;
