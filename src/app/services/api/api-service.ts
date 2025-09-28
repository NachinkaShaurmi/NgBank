import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, Observable } from 'rxjs';
import {
  ILogin,
  User,
  Account,
  CreateAccountDto,
  LoginResponse,
  UpdateAccountDto,
  CreateTransactionDto,
  Transaction,
} from '../../interfaces/interfaces';
import { Storage } from '../storage/storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://be-12092025.onrender.com';

  private http: HttpClient = inject(HttpClient);
  public storage: Storage = inject(Storage);

  login(credentials: ILogin): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(retry(3));
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/user/${userId}`);
  }

  getUserAccounts(userId: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.API_URL}/account/user/${userId}`);
  }

  createAccount(accountData: CreateAccountDto): Observable<Account> {
    return this.http.post<Account>(`${this.API_URL}/account`, accountData);
  }

  getAccount(accountId: string): Observable<Account> {
    return this.http.get<Account>(`${this.API_URL}/account/${accountId}`);
  }

  updateAccount(
    accountId: string,
    data: UpdateAccountDto
  ): Observable<Account> {
    return this.http.put<Account>(`${this.API_URL}/account/${accountId}`, data);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/user`);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.API_URL}/account`);
  }

  createTransaction(data: CreateTransactionDto): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.API_URL}/transaction`, data);
  }
}
