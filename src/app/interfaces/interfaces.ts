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
  balance: string;
  createdAt: string;
  user: User;
  outgoingTransactions?: TransactionWithAccount[];
  incomingTransactions?: TransactionWithAccount[];
}

export interface CreateAccountDto {
  userId: string;
  currency?: 'EUR' | 'USD';
  balance?: number;
  name?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  userId: string;
  amount: string;
  date: string;
}

export interface TransactionWithAccount extends Transaction {
  fromAccount?: AccountBasic;
  toAccount?: AccountBasic;
}

export interface AccountBasic {
  id: string;
  userId: string;
  name: string;
  currency: 'EUR' | 'USD';
  balance: string;
  createdAt: string;
  user: User;
}

export interface UpdateAccountDto {
  name: string;
}

export interface CreateTransactionDto {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}
