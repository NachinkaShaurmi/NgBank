import { Routes } from '@angular/router';
import {SignUp} from './components/sign-up/sign-up';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-page/login-page').then((r) => r.Login),
    title: 'Login',
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./components/sign-up/sign-up').then(
        (r) => r.SignUp
      ),
    title: 'SignUp',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/personal-account/personal-account').then(
        (r) => r.PersonalAccount
      ),
    title: 'Home',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found').then(
        (r) => r.PageNotFound
      ),
    title: 'Page 404',
  },
];
