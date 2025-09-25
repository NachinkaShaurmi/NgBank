import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Auth implements CanActivate {
  isLogin: Storage = inject(Storage);
  router: Router = inject(Router);

  canActivate(): boolean | UrlTree {
    if (this.isLogin.isActive()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
