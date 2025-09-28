import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateAccountDialog } from './create-account-dialog';
import { provideTranslateService } from '@ngx-translate/core';

describe('CreateAccountDialog', () => {
  let component: CreateAccountDialog;
  let fixture: ComponentFixture<CreateAccountDialog>;
  let mockDialogRef: jest.Mocked<MatDialogRef<CreateAccountDialog>>;

  beforeEach(async () => {
    const dialogRefSpy = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [CreateAccountDialog],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        provideTranslateService(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountDialog);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(MatDialogRef) as jest.Mocked<
      MatDialogRef<CreateAccountDialog>
    >;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.accountForm.get('name')?.value).toBe('');
    expect(component.accountForm.get('currency')?.value).toBe('EUR');
    expect(component.accountForm.get('balance')?.value).toBe(0);
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should not create account with invalid form', () => {
    component.onCreate();
    expect(mockDialogRef.close).not.toHaveBeenCalledWith(expect.any(Object));
  });

  it('should create account with valid form data', () => {
    component.accountForm.patchValue({
      name: 'Test Account',
      currency: 'USD',
      balance: 100,
    });

    component.onCreate();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      name: 'Test Account',
      currency: 'USD',
      balance: 100,
    });
  });

  it('should validate negative balance', () => {
    component.accountForm.patchValue({ name: 'Test', balance: -10 });
    expect(component.accountForm.valid).toBe(false);
  });

  it('should validate required name field', () => {
    component.accountForm.patchValue({
      name: '',
      currency: 'EUR',
      balance: 100,
    });
    expect(component.accountForm.valid).toBe(false);
  });

  it('should accept both EUR and USD currencies', () => {
    component.accountForm.patchValue({
      name: 'Test',
      currency: 'EUR',
      balance: 100,
    });
    expect(component.accountForm.valid).toBe(true);

    component.accountForm.patchValue({ currency: 'USD' });
    expect(component.accountForm.valid).toBe(true);
  });
});
