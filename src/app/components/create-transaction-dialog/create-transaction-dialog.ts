import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialModule } from '../../material/material-module';
import { ApiService } from '../../services/api/api-service';
import { User, Account } from '../../interfaces/interfaces';

@Component({
  selector: 'app-create-transaction-dialog',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './create-transaction-dialog.html',
  styleUrl: './create-transaction-dialog.scss',
})
export class CreateTransactionDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateTransactionDialog>);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private data = inject(MAT_DIALOG_DATA) as {
    fromAccountId: string;
    currency: string;
  };

  readonly users = signal<User[]>([]);
  readonly accounts = signal<Account[]>([]);
  readonly currency: string;

  readonly transactionForm = this.fb.group({
    selectedUser: ['', Validators.required],
    toAccountId: [{ value: '', disabled: true }, Validators.required],
    amount: [null, [Validators.required, Validators.min(0.01)]],
  });

  readonly filteredAccounts = computed(() => {
    return this.accounts().filter(
      (account) =>
        account.currency === this.currency &&
        account.id !== this.data.fromAccountId
    );
  });

  constructor() {
    this.currency = this.data.currency;
    this.loadData();
    this.setupFormSubscriptions();
  }

  private loadData() {
    this.apiService
      .getAllUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => {
          this.users.set(users);
        },
      });
  }

  private setupFormSubscriptions() {
    this.transactionForm
      .get('selectedUser')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((userId) => {
        const toAccountControl = this.transactionForm.get('toAccountId');
        toAccountControl?.setValue('');

        if (userId) {
          this.apiService
            .getUserAccounts(userId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (accounts) => {
                this.accounts.set(accounts);
                toAccountControl?.enable();
              },
            });
        } else {
          this.accounts.set([]);
          toAccountControl?.disable();
        }
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      this.dialogRef.close({
        fromAccountId: this.data.fromAccountId,
        toAccountId: formValue.toAccountId,
        amount: formValue.amount,
      });
    }
  }
}
