import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  isActive(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUserId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  setTokens(accessToken: string, refreshToken: string, userId: string): void {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
  }

  clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  }
}
