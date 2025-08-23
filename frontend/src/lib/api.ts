// src/lib/api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_URL, AUTH_TOKEN_KEY } from './constants';

class ApiClient {
  private instance: AxiosInstance;
  private mockMode = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_URL?.includes('localhost:8000');

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
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
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          this.removeAuthToken();
          // Redirect to login if not already there
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: any): Promise<T> {
    if (this.mockMode) {
      return this.getMockData<T>(url, params);
    }
    
    const response: AxiosResponse<T> = await this.instance.get(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    if (this.mockMode) {
      return this.getMockData<T>(url, data);
    }
    
    const response: AxiosResponse<T> = await this.instance.post(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    if (this.mockMode) {
      return this.getMockData<T>(url, data);
    }
    
    const response: AxiosResponse<T> = await this.instance.patch(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    if (this.mockMode) {
      return this.getMockData<T>(url, data);
    }
    
    const response: AxiosResponse<T> = await this.instance.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    if (this.mockMode) {
      return this.getMockData<T>(url);
    }
    
    const response: AxiosResponse<T> = await this.instance.delete(url);
    return response.data;
  }

  private getMockData<T>(url: string, params?: any): Promise<T> {
    // Mock data responses untuk development
    console.log('Mock API call:', url, params);
    
    if (url.includes('/auth/login') || url.includes('/auth/register')) {
      return Promise.resolve({
        message: 'Authentication successful',
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          role: 'customer',
          is_active: true,
          created_at: new Date().toISOString(),
        },
        access_token: 'mock-token-' + Math.random().toString(36),
        token_type: 'Bearer',
        expires_in: 3600,
      } as T);
    }

    if (url.includes('/auth/me')) {
      return Promise.resolve({
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          role: 'customer',
          is_active: true,
          created_at: new Date().toISOString(),
        }
      } as T);
    }
    
    if (url.includes('/products')) {
      return Promise.resolve({
        data: [], // Mock products
        meta: { current_page: 1, last_page: 1, total: 0, from: 1, to: 0, per_page: 12 }
      } as T);
    }
    
    if (url.includes('/cart')) {
      if (url.includes('/cart/items') && params) {
        return Promise.resolve({
          message: 'Item added to cart',
          data: {
            cart_summary: {
              total_items: 1,
              subtotal: 100000
            }
          }
        } as T);
      }
      
      return Promise.resolve({
        data: {
          id: 1,
          items: [],
          total_quantity: 0,
          subtotal: 0,
          total: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      } as T);
    }

    return Promise.resolve({
      data: [],
      message: 'Mock response'
    } as T);
  }

  setAuthToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  }

  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  }

  removeAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

const api = new ApiClient();
export default api;