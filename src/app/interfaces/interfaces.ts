export interface ILogin {
  login: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  login: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  balance: number;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  currency: 'EUR' | 'USD';
  balance: number;
  createdAt: string;
  user: User;
}

export interface CreateAccountDto {
  userId: string;
  currency?: 'EUR' | 'USD';
  balance?: number;
  name?: string;
}
