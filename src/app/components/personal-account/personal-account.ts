import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { User, Account } from '../../interfaces/interfaces';
import { MaterialModule } from '../../material/material-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-account',
  imports: [MaterialModule, CommonModule],
  templateUrl: './personal-account.html',
  styleUrl: './personal-account.scss',
})
export class PersonalAccount implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);

  // TODO Hardcoded userId for now, replace with real auth logic later
  private readonly userId = '9871f1d7-b579-4fe3-985f-d2730662cbe4';

  user = signal<User | null>(null);
  accounts = signal<Account[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadUserData();
    this.loadAccounts();
  }

  private loadUserData() {
    this.apiService.getUser(this.userId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load user data');
        this.loading.set(false);
      },
    });
  }

  private loadAccounts() {
    this.apiService.getUserAccounts(this.userId).subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
      },
      error: () => {
        this.error.set('Failed to load accounts');
      },
    });
  }

  onAccountClick(accountId: string) {
    this.router.navigate(['/account', accountId]);
  }

  onCreateAccount() {
    console.log('Create new account');
  }
}
