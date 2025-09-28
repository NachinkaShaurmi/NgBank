import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Storage } from '../storage/storage';

@Injectable({
  providedIn: 'root',
})
export class Auth implements CanActivate {
  storage = inject(Storage);
  router = inject(Router);

  canActivate(): boolean | UrlTree {
    return this.storage.isActive()
      ? true
      : this.router.createUrlTree(['/login']);
  }
}
