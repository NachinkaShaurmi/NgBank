import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  token = this.getToken();
  getToken(): string {
    if (this.isActive()) {
      return localStorage.getItem('token')!;
    }
    return '';
  }
  isActive(): boolean {
    return (
      typeof window !== 'undefined' && localStorage.getItem('token') !== null
    );
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  removeToken(): void {
    localStorage.removeItem('token');
  }
}
