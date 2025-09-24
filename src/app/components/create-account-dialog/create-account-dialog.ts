import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material-module';

@Component({
  selector: 'app-create-account-dialog',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './create-account-dialog.html',
  styleUrl: './create-account-dialog.scss',
})
export class CreateAccountDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateAccountDialog>);

  accountForm = this.fb.group({
    name: ['', Validators.required],
    currency: ['EUR', Validators.required],
    balance: [0, [Validators.required, Validators.min(0)]],
  });

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    if (this.accountForm.valid) {
      this.dialogRef.close(this.accountForm.value);
    }
  }
}
