export interface ILogin {
  login: string;
  password: string;
}

export interface IUser {
  accounts: [IAccount];
  id: string;
  name: string;
  email: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  balance: number;
}

export interface IAccount {
  id: string;
  userId: string;
  name: string;
  currency: string;
  balance: string;
  createdAt: string;
}
