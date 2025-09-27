import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserData} from '../interfaces/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'https://be-12092025.onrender.com';
  private http = inject(HttpClient);

  postUser(obj: User) {
    return this.http.post(`${this.apiUrl}/auth/signup`, obj);
  }

  getUserById(userId: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/user/${userId}`);
  }

  editUserById(userId: string, obj: any) {
    return this.http.put(`${this.apiUrl}/user/${userId}`, obj);
  }
}
