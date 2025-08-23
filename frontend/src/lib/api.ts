// src/lib/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_URL, AUTH_TOKEN_KEY } from './constants';

// > Ganti cara deteksi mock: pakai flag ENV, default = off
const ENABLE_API_MOCK =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_ENABLE_API_MOCK === '1') ? true : false;

class ApiClient {
  private instance: AxiosInstance;
  private mockMode = ENABLE_API_MOCK;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,           // ex: http://127.0.0.1:8000/api/v1
      withCredentials: true,      // PENTING: bawa session cookie (guest cart, dll.)
      timeout: 30000,
      headers: {
        'Accept': 'application/json',          // Laravel suka ini
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          (config.headers ||= {}).Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 401) {
          this.removeAuthToken();
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: any): Promise<T> {
    if (this.mockMode) return this.getMockData<T>(url, params);
    const response: AxiosResponse<T> = await this.instance.get(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    if (this.mockMode) return this.getMockData<T>(url, data);
    const response: AxiosResponse<T> = await this.instance.post(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    if (this.mockMode) return this.getMockData<T>(url, data);
    const response: AxiosResponse<T> = await this.instance.patch(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    if (this.mockMode) return this.getMockData<T>(url, data);
    const response: AxiosResponse<T> = await this.instance.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    if (this.mockMode) return this.getMockData<T>(url);
    const response: AxiosResponse<T> = await this.instance.delete(url);
    return response.data;
  }

  // --- MOCK (opsional, hanya aktif kalau NEXT_PUBLIC_ENABLE_API_MOCK=1) ---
  private getMockData<T>(url: string, params?: any): Promise<T> {
    console.log('Mock API call:', url, params);
    // (biarkan blok mock kamu yang lama di sini)
    return Promise.resolve({ data: [], message: 'Mock response' } as T);
  }

  setAuthToken(token: string) {
    if (typeof window !== 'undefined') localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  getAuthToken(): string | null {
    if (typeof window !== 'undefined') return localStorage.getItem(AUTH_TOKEN_KEY);
    return null;
  }
  removeAuthToken() {
    if (typeof window !== 'undefined') localStorage.removeItem(AUTH_TOKEN_KEY);
  }
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

const api = new ApiClient();
export default api;
