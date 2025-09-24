import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  newData = new BehaviorSubject<IUser[]>([]);
  currentData = this.getNewData().asObservable();
  constructor(public router: Router) {}

  token = this.getToken();
  getToken(): string {
    if (this.isActive()) {
      return localStorage.getItem('token')!;
    }
    return '';
  }
  isActive(): boolean {
    return (
      typeof window !== 'undefined' && localStorage.getItem('token') !== null
    );
  }
  setToken(arr: Array<string>): void {
    localStorage.setItem('token', arr[0]);
    localStorage.setItem('id', arr[2]);
    this.router.navigate(['home']);
  }
  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
  getData(d: IUser[]) {
    this.newData.next(d);
  }
  getNewData() {
    return this.newData;
  }
}
