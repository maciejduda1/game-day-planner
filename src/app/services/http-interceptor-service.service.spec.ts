import { TestBed } from '@angular/core/testing';

import { HttpInterceptorServiceService } from './http-interceptor-service.service';

describe('HttpInterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptorServiceService = TestBed.get(HttpInterceptorServiceService);
    expect(service).toBeTruthy();
  });
});
