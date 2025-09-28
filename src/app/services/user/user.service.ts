import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://be-12092025.onrender.com';
  private http = inject(HttpClient);

  postUser(obj: UserDto) {
    console.log(obj);
    return this.http.post(`${this.apiUrl}/auth/signup`, obj);
  }
}
