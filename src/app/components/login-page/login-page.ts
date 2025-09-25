import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { Storage } from '../../services/storage';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private storage = inject(Storage);
  private router = inject(Router);

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

    this.apiService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.storage.setTokens(
          response.accessToken,
          response.refreshToken,
          response.userId
        );
        this.router.navigate(['/home']);
      },
      error: () => {
        this.error.set('Login failed. Please check your credentials.');
        this.loading.set(false);
      },
    });
  }
}
