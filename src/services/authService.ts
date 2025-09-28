import api from './api';

export interface Staff {
  staff_id: number;
  first_name: string;
  last_name: string;
  username: string;
  active: number;
}

export interface LoginResponse {
  message: string;
  token: string;
  staff: Staff;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { username, password });
    return response.data as LoginResponse;
  },

  async getCurrentStaff(): Promise<Staff> {
    const response = await api.get('/auth/me');
    return response.data as Staff;
  },

  async verifyToken(token: string): Promise<{ valid: boolean; staff: Staff }> {
    const response = await api.post('/auth/verify', { token });
    return response.data as { valid: boolean; staff: Staff };
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getCurrentUser(): Staff | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};