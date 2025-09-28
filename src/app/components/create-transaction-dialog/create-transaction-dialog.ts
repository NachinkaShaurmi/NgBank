import {
  Component,
  inject,
  signal,
  computed,
  DestroyRef,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material/material-module';
import { ApiService } from '../../services/api/api-service';
import { Account } from '../../interfaces/interfaces';

@Component({
  selector: 'app-create-transaction-dialog',
  imports: [MaterialModule, ReactiveFormsModule, TranslateModule],
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

  readonly dialogFromAccountId = input<string>();
  readonly dialogCurrency = input<string>();

  readonly users = toSignal(this.apiService.getAllUsers(), {
    initialValue: [],
  });
  readonly accounts = signal<Account[]>([]);
  readonly currency: string;

  readonly transactionForm = this.fb.group({
    selectedUser: ['', Validators.required],
    toAccountId: [{ value: '', disabled: true }, Validators.required],
    amount: [
      null as number | null,
      [Validators.required, Validators.min(0.01), Validators.max(100000)],
    ],
  });

  get amountErrors() {
    const control = this.transactionForm.get('amount');
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Amount is required';
      if (control.errors['min']) return 'Amount must be at least 0.01';
      if (control.errors['max']) return 'Amount cannot exceed 100,000';
    }
    return null;
  }

  readonly filteredAccounts = computed(() => {
    return this.accounts().filter(
      (account) =>
        account.currency === this.currency &&
        account.id !== this.data.fromAccountId
    );
  });

  constructor() {
    this.currency = this.data.currency;
    this.setupFormSubscriptions();
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
