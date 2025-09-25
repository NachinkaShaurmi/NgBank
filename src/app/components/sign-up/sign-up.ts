import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    login: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submitUser() {
    if (this.userForm.valid) {
      this.userService.postUser(this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => alert('sing in failed'),
      });
    }
  }
}
