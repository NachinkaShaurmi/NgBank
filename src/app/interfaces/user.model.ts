export interface User {
  name: string;
  login: string;
  email: string;
  password: string;
}

export interface UserData {
  id: string
  name: string
  email: string
  login: string
  version: number
  createdAt: number
  updatedAt: number
  accounts: Account[]
  balance: number
}

export interface Account {
  id: string
  userId: string
  name: string
  currency: string
  balance: string
  createdAt: string
}
