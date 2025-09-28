import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api-service';
import { Storage } from '../storage/storage';
import { CreateAccountDto } from '../../interfaces/interfaces';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const storageSpy = { getToken: jest.fn().mockReturnValue('test-token') };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Storage, useValue: storageSpy }],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {
    const mockCredentials = { login: 'test', password: 'pass' };
    const mockResponse = {
      accessToken: 'token',
      refreshToken: 'refresh',
      userId: 'user-123',
    };

    service.login(mockCredentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'https://be-12092025.onrender.com/auth/login'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);
    req.flush(mockResponse);
  });

  it('should get user with authorization header', () => {
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      email: 'test@test.com',
      login: 'test',
      version: 1,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      balance: 1000,
    };

    service.getUser('user-123').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      'https://be-12092025.onrender.com/user/user-123'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create account', () => {
    const mockAccountData: CreateAccountDto = {
      userId: 'user-123',
      name: 'Test Account',
      currency: 'EUR',
      balance: 100,
    };
    const mockAccount = {
      id: 'acc-1',
      ...mockAccountData,
      createdAt: '2024-01-01',
      user: {},
    };

    service.createAccount(mockAccountData).subscribe((account) => {
      expect(account).toEqual(mockAccount);
    });

    const req = httpMock.expectOne('https://be-12092025.onrender.com/account');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAccountData);
    req.flush(mockAccount);
  });

  it('should update account', () => {
    const updateData = { name: 'Updated Account' };
    const mockAccount = {
      id: 'acc-1',
      name: 'Updated Account',
      userId: 'user-123',
      currency: 'EUR',
      balance: '100.00',
      createdAt: '2024-01-01',
      user: {},
    };

    service.updateAccount('acc-1', updateData).subscribe((account) => {
      expect(account).toEqual(mockAccount);
    });

    const req = httpMock.expectOne(
      'https://be-12092025.onrender.com/account/acc-1'
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateData);
    req.flush(mockAccount);
  });

  it('should create transaction', () => {
    const transactionData = {
      fromAccountId: 'acc-1',
      toAccountId: 'acc-2',
      amount: 100,
    };
    const mockTransaction = {
      id: 'tx-1',
      ...transactionData,
      userId: 'user-123',
      date: '2024-01-01',
    };

    service.createTransaction(transactionData).subscribe((transaction) => {
      expect(transaction).toEqual(mockTransaction);
    });

    const req = httpMock.expectOne(
      'https://be-12092025.onrender.com/transaction'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(transactionData);
    req.flush(mockTransaction);
  });

  it('should get all users', () => {
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

    service.getAllUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://be-12092025.onrender.com/user');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
