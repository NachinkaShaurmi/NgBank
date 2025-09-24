import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { retry, Observable } from 'rxjs';
import {
  ILogin,
  User,
  Account,
  CreateAccountDto,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://be-12092025.onrender.com';
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private getHeaders() {
    const token =
      localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODcxZjFkNy1iNTc5LTRmZTMtOTg1Zi1kMjczMDY2MmNiZTQiLCJsb2dpbiI6ImpvaG5fZG9lIiwiaWF0IjoxNzU4NzI5Mjg2LCJleHAiOjE3NjEzMjEyODZ9.B5KpakPSBKAmpieaIDsMX35QirP_Xajvfoix7pdDzXQ';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getLogin(prop: ILogin) {
    this.http
      .post(this.API_URL + '/auth/login', prop)
      .pipe(retry(4))
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Login failed', error.status);
        },
      });
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
}
