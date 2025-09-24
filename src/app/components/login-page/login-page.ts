import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { Storage } from '../../services/storage';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class Login {
  private fb: FormBuilder = inject(FormBuilder);
  apiService: ApiService = inject(ApiService);
  storage: Storage = inject(Storage);

  loginForm = this.fb.nonNullable.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.storage.removeToken();
    if (this.loginForm.valid) {
      this.apiService.getLogin(this.loginForm.getRawValue());
    }
  }
}
