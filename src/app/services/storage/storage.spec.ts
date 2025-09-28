import { TestBed } from '@angular/core/testing';
import { Storage } from './storage';

describe('Storage', () => {
  let service: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Storage);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when no token exists', () => {
    expect(service.isActive()).toBe(false);
  });

  it('should return true when token exists', () => {
    localStorage.setItem('token', 'test-token');
    expect(service.isActive()).toBe(true);
  });

  it('should set and get tokens correctly', () => {
    service.setTokens('access-token', 'refresh-token', 'user-123');

    expect(service.getToken()).toBe('access-token');
    expect(service.getUserId()).toBe('user-123');
    expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
  });

  it('should clear all tokens', () => {
    service.setTokens('access-token', 'refresh-token', 'user-123');
    service.clearTokens();

    expect(service.getToken()).toBe('');
    expect(service.getUserId()).toBe('');
    expect(service.isActive()).toBe(false);
  });
});
