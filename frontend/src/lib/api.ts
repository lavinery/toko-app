
// src/lib/api.ts - Add mock mode for development
class ApiClient {
  private mockMode = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_URL?.includes('localhost:8000');

  async get<T>(url: string, params?: any): Promise<T> {
    if (this.mockMode) {
      return this.getMockData<T>(url, params);
    }
    
    const response = await this.instance.get(url, { params });
    return response.data;
  }

  private getMockData<T>(url: string, params?: any): Promise<T> {
    // Mock data responses untuk development
    if (url.includes('/products')) {
      return Promise.resolve({
        data: [], // Mock products
        meta: { current_page: 1, last_page: 1, total: 0, from: 1, to: 0, per_page: 12 }
      } as T);
    }
    
    if (url.includes('/cart')) {
      return Promise.resolve({
        data: {
          items: [],
          total_quantity: 0,
          subtotal: 0,
          total: 0
        }
      } as T);
    }

    return Promise.resolve({} as T);
  }
}