import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-page/login-page').then((r) => r.Login),
    title: 'Login',
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
