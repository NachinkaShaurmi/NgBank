import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CreateTransactionDialog } from './create-transaction-dialog';
import { ApiService } from '../../services/api/api-service';
import { Account } from '../../interfaces/interfaces';

describe('CreateTransactionDialog', () => {
  let component: CreateTransactionDialog;
  let fixture: ComponentFixture<CreateTransactionDialog>;
  let mockDialogRef: jest.Mocked<MatDialogRef<CreateTransactionDialog>>;
  let mockApiService: jest.Mocked<ApiService>;

  const mockUsers = [
    {
      id: 'user-1',
      name: 'User 1',
      email: 'user1@test.com',
      login: 'user1',
      version: 1,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      balance: 1000,
    },
  ];
  const mockAccounts: Account[] = [
    {
      id: 'acc-2',
      userId: 'user-1',
      name: 'Account 2',
      currency: 'EUR',
      balance: '200.00',
      createdAt: '2024-01-01',
      user: mockUsers[0],
    },
  ];

  beforeEach(async () => {
    const dialogRefSpy = { close: jest.fn() };
    const apiSpy = {
      getAllUsers: jest.fn().mockReturnValue(of(mockUsers)),
      getUserAccounts: jest.fn().mockReturnValue(of(mockAccounts)),
    };

    await TestBed.configureTestingModule({
      imports: [CreateTransactionDialog],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { fromAccountId: 'acc-1', currency: 'EUR' },
        },
        { provide: ApiService, useValue: apiSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTransactionDialog);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(MatDialogRef) as jest.Mocked<
      MatDialogRef<CreateTransactionDialog>
    >;
    mockApiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct currency', () => {
    expect(component.currency).toBe('EUR');
  });

  it('should load users on init', () => {
    expect(mockApiService.getAllUsers).toHaveBeenCalled();
    expect(component.users()).toEqual(mockUsers);
  });

  it('should enable account selection when user is selected', () => {
    component.transactionForm.get('selectedUser')?.setValue('user-1');
    expect(mockApiService.getUserAccounts).toHaveBeenCalledWith('user-1');
  });

  it('should filter accounts by currency and exclude source account', () => {
    component.accounts.set(mockAccounts);
    const filtered = component.filteredAccounts();
    expect(filtered).toEqual(mockAccounts);
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should create transaction with valid form', () => {
    component.transactionForm.patchValue({
      selectedUser: 'user-1',
      toAccountId: 'acc-2',
      amount: 100,
    });

    component.onCreate();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      fromAccountId: 'acc-1',
      toAccountId: 'acc-2',
      amount: 100,
    });
  });

  it('should not create transaction with invalid form', () => {
    component.onCreate();
    expect(mockDialogRef.close).not.toHaveBeenCalledWith(expect.any(Object));
  });
});
