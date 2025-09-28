import { Component, DestroyRef, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api/api-service';
import { Account } from '../../interfaces/interfaces';
import { MaterialModule } from '../../material/material-module';
import { CommonModule } from '@angular/common';
import { CreateAccountDialog } from '../create-account-dialog/create-account-dialog';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Storage } from '../../services/storage/storage';

@Component({
  selector: 'app-personal-account',
  imports: [MaterialModule, CommonModule, TranslateModule],
  templateUrl: './personal-account.html',
  styleUrl: './personal-account.scss',
})
export class PersonalAccount {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private storage = inject(Storage);

  private userId = this.storage.getUserId();
  readonly user = toSignal(this.apiService.getUser(this.userId));
  readonly accounts = signal<Account[] | null>(null);
  readonly loading = computed(() => !this.user() || this.accounts() === null);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadAccounts();
  }

  private destroyRef = inject(DestroyRef);

  private loadAccounts() {
    this.apiService
      .getUserAccounts(this.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
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
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.loadAccounts();
      });
  }
}
