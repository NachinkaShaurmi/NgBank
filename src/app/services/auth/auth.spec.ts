import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Auth } from './auth';
import { Storage } from '../storage/storage';

describe('Auth', () => {
  let service: Auth;
  let mockStorage: jest.Mocked<Storage>;

  beforeEach(() => {
    const storageSpy = {
      isActive: jest.fn(),
    };
    const routerSpy = {
      createUrlTree: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storageSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(Auth);
    mockStorage = TestBed.inject(Storage) as jest.Mocked<Storage>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow access when user is authenticated', () => {
    mockStorage.isActive.mockReturnValue(true);

    expect(service.canActivate()).toBe(true);
  });
});
