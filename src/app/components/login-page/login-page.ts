import { Component, inject, signal, DestroyRef } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api/api-service';
import { Storage } from '../../services/storage/storage';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private storage = inject(Storage);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);

  loading = signal(false);
  error = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.loading.set(true);
    this.error.set(null);

    this.apiService
      .login(this.loginForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.storage.setTokens(
            response.accessToken,
            response.refreshToken,
            response.userId
          );
          this.router.navigate(['/home']);
        },
        error: () => {
          this.error.set(this.translate.instant('AUTH.LOGIN_FAILED'));
          this.loading.set(false);
        },
      });
  }
}
