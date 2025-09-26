import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, Observable } from 'rxjs';
import {
  ILogin,
  User,
  Account,
  CreateAccountDto,
  LoginResponse,
  UpdateAccountDto,
} from '../../interfaces/interfaces';
import { Storage } from '../storage/storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://be-12092025.onrender.com';

  private http: HttpClient = inject(HttpClient);
  public storage: Storage = inject(Storage);

  private getHeaders() {
    const token = this.storage.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  login(credentials: ILogin): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(retry(3));
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/user/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  getUserAccounts(userId: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.API_URL}/account/user/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  createAccount(accountData: CreateAccountDto): Observable<Account> {
    return this.http.post<Account>(`${this.API_URL}/account`, accountData, {
      headers: this.getHeaders(),
    });
  }

  getAccount(accountId: string): Observable<Account> {
    return this.http.get<Account>(`${this.API_URL}/account/${accountId}`, {
      headers: this.getHeaders(),
    });
  }

  updateAccount(
    accountId: string,
    data: UpdateAccountDto
  ): Observable<Account> {
    return this.http.put<Account>(
      `${this.API_URL}/account/${accountId}`,
      data,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
