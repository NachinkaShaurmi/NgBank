import { Routes } from '@angular/router';
import { Auth } from './services/auth/auth';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-page/login-page').then((r) => r.Login),
    title: 'Login',
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./components/sign-up/sign-up').then((r) => r.SignUp),
    title: 'SignUp',
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((r) => r.Layout),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/personal-account/personal-account').then(
            (r) => r.PersonalAccount
          ),
        canActivate: [Auth],
        title: 'Home',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/profile/profile').then((r) => r.Profile),
        canActivate: [Auth],
        title: 'Profile',
      },
      {
        path: 'account/:id',
        loadComponent: () =>
          import('./components/account/account').then(
            (r) => r.AccountComponent
          ),
        canActivate: [Auth],
        title: 'Account Details',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found').then(
        (r) => r.PageNotFound
      ),
    title: 'Page 404',
    data: { redirectTo: '/home' },
  },
];
