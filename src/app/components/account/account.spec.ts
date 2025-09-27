import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { AccountComponent } from './account';
import { ApiService } from '../../services/api/api-service';
import { Account } from '../../interfaces/interfaces';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockApiService: jest.Mocked<ApiService>;

  const mockAccount: Account = {
    id: 'acc-1',
    userId: 'user-123',
    name: 'Test Account',
    currency: 'EUR',
    balance: '500.00',
    createdAt: '2024-01-01',
    user: {
      id: 'user-123',
      name: 'Test User',
      email: 'test@test.com',
      login: 'test',
      version: 1,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      balance: 1000,
    },
    outgoingTransactions: [],
    incomingTransactions: [],
  };

  beforeEach(async () => {
    const apiSpy = {
      getAccount: jest.fn().mockReturnValue(of(mockAccount)),
      updateAccount: jest
        .fn()
        .mockReturnValue(of({ ...mockAccount, name: 'Updated Account' })),
      getAllUsers: jest.fn().mockReturnValue(of([])),
      getUserAccounts: jest.fn().mockReturnValue(of([])),
      createTransaction: jest.fn().mockReturnValue(of({})),
    };
    const dialogSpy = {
      open: jest.fn().mockReturnValue({ afterClosed: () => of(null) }),
      _openDialogs: [],
      _getAfterAllClosed: jest.fn(),
      _afterAllClosedAtThisLevel: jest.fn(),
    };
    const routeSpy = {
      snapshot: { paramMap: { get: jest.fn().mockReturnValue('acc-1') } },
    };

    await TestBed.configureTestingModule({
      imports: [AccountComponent],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable name editing', () => {
    component.account.set(mockAccount);
    component.editName();

    expect(component.editingName()).toBe(true);
    expect(component.nameControl.value).toBe('Test Account');
  });

  it('should cancel name editing', () => {
    component.editingName.set(true);
    component.nameControl.setValue('Some Name');

    component.cancelEdit();

    expect(component.editingName()).toBe(false);
    expect(component.nameControl.value).toBe('');
  });

  it('should save account name when valid', () => {
    component.nameControl.setValue('New Account Name');

    component.saveName();

    expect(mockApiService.updateAccount).toHaveBeenCalledWith('acc-1', {
      name: 'New Account Name',
    });
  });

  it('should not save account name when invalid', () => {
    component.nameControl.setValue('');

    component.saveName();

    expect(mockApiService.updateAccount).not.toHaveBeenCalled();
  });

  it('should handle account loading error', () => {
    mockApiService.getAccount.mockReturnValue(
      throwError(() => new Error('API Error'))
    );

    component['loadAccountData']();

    expect(component.error()).toBe('Failed to load account data');
    expect(component.loading()).toBe(false);
  });

  it('should have transaction computed property', () => {
    component.account.set(mockAccount);
    const transactions = component.transactions();
    expect(Array.isArray(transactions)).toBe(true);
  });
});
