import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'https://be-12092025.onrender.com';

  constructor(private http: HttpClient) {
  }

  postUser(obj: User) {
    console.log(obj);
    return this.http.post(`${this.apiUrl}/auth/signup`, obj);
  }
}
