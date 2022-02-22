import { TestBed } from '@angular/core/testing';

import { AfterAdminLoginService } from './after-admin-login.service';

describe('AfterAdminLoginService', () => {
  let service: AfterAdminLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfterAdminLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
