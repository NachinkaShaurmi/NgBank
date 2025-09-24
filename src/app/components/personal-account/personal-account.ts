import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api-service';
import { User, Account } from '../../interfaces/interfaces';
import { MaterialModule } from '../../material/material-module';
import { CommonModule } from '@angular/common';
import { CreateAccountDialog } from '../create-account-dialog/create-account-dialog';
import { switchMap, forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-personal-account',
  imports: [MaterialModule, CommonModule],
  templateUrl: './personal-account.html',
  styleUrl: './personal-account.scss',
})
export class PersonalAccount {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  private userId = '9871f1d7-b579-4fe3-985f-d2730662cbe4'; // TODO get from auth

  readonly user = signal<User | null>(null);
  readonly accounts = signal<Account[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadData();
  }

  private loadData() {
    forkJoin({
      user: this.apiService.getUser(this.userId),
      accounts: this.apiService.getUserAccounts(this.userId),
    })
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: ({ user, accounts }) => {
          this.user.set(user);
          this.accounts.set(accounts);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load data');
          this.loading.set(false);
        },
      });
  }

  private loadAccounts() {
    this.apiService.getUserAccounts(this.userId).subscribe({
      next: (accounts) => this.accounts.set(accounts),
      error: () => this.error.set('Failed to load accounts'),
    });
  }

  onAccountClick(accountId: string) {
    this.router.navigate(['/account', accountId]);
  }

  onCreateAccount() {
    this.dialog
      .open(CreateAccountDialog)
      .afterClosed()
      .pipe(
        switchMap((result) =>
          result
            ? this.apiService.createAccount({ userId: this.userId, ...result })
            : []
        )
      )
      .subscribe(() => this.loadAccounts());
  }
}
