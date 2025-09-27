import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const response = localStorage.getItem('response');
  let token: string | null = null;

  if (response) {
    try {
      const parsed = JSON.parse(response);
      token = parsed?.accessToken ?? null;
    } catch (e) {
      console.error('Token parse error:', e);
    }
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};

