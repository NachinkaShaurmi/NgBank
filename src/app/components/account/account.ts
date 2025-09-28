import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api/api-service';
import { Account } from '../../interfaces/interfaces';
import { MaterialModule } from '../../material/material-module';
import { CommonModule } from '@angular/common';
import { CreateTransactionDialog } from '../create-transaction-dialog/create-transaction-dialog';

@Component({
  selector: 'app-account',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class AccountComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  readonly account = signal<Account | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly editingName = signal(false);

  readonly nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  readonly transactions = computed(() => {
    const acc = this.account();
    if (!acc) return [];
    return [
      ...(acc.outgoingTransactions ?? []),
      ...(acc.incomingTransactions ?? []),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  private readonly accountId = this.route.snapshot.paramMap.get('id') || '';

  constructor() {
    this.loadAccountData();
  }

  private loadAccountData() {
    const id = this.accountId;
    if (!id) {
      this.error.set('Account ID not found');
      this.loading.set(false);
      return;
    }

    this.apiService
      .getAccount(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (account) => {
          this.account.set(account);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load account data');
          this.loading.set(false);
        },
      });
  }

  editName() {
    const currentAccount = this.account();
    if (currentAccount) {
      this.nameControl.setValue(currentAccount.name);
      this.editingName.set(true);
    }
  }

  saveName() {
    if (this.nameControl.invalid) return;

    const accountId = this.accountId;
    const newName = this.nameControl.value!;

    this.apiService
      .updateAccount(accountId, { name: newName })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedAccount) => {
          this.account.set(updatedAccount);
          this.editingName.set(false);
        },
        error: () => {
          this.error.set('Failed to update account name');
        },
      });
  }

  cancelEdit() {
    this.editingName.set(false);
    this.nameControl.setValue('');
  }

  onNewTransaction() {
    const currentAccount = this.account();
    if (!currentAccount) return;

    this.dialog.open(CreateTransactionDialog, {
      data: {
        fromAccountId: currentAccount.id,
        currency: currentAccount.currency
      }
    })
    .afterClosed()
    .pipe(
      switchMap(result => result ? 
        this.apiService.createTransaction(result) : 
        []
      ),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(() => this.loadAccountData());
  }
}
