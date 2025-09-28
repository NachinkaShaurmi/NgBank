import { Component, inject, input } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material/material-module';

@Component({
  selector: 'app-create-account-dialog',
  imports: [MaterialModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './create-account-dialog.html',
  styleUrl: './create-account-dialog.scss',
})
export class CreateAccountDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateAccountDialog>);

  readonly initialName = input<string>('');
  readonly initialCurrency = input<'EUR' | 'USD'>('EUR');
  readonly initialBalance = input<number>(0);

  accountForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    currency: ['EUR', Validators.required],
    balance: [
      0,
      [Validators.required, Validators.min(0), Validators.max(1000000)],
    ],
  });

  get nameErrors() {
    const control = this.accountForm.get('name');
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Account name is required';
      if (control.errors['minlength'])
        return 'Name must be at least 2 characters';
      if (control.errors['maxlength'])
        return 'Name cannot exceed 50 characters';
    }
    return null;
  }

  get balanceErrors() {
    const control = this.accountForm.get('balance');
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Initial balance is required';
      if (control.errors['min']) return 'Balance cannot be negative';
      if (control.errors['max']) return 'Balance cannot exceed 1,000,000';
    }
    return null;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    if (this.accountForm.valid) {
      this.dialogRef.close(this.accountForm.value);
    }
  }
}
