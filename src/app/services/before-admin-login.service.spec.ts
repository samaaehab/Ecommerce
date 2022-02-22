import { TestBed } from '@angular/core/testing';

import { BeforeAdminLoginService } from './before-admin-login.service';

describe('BeforeAdminLoginService', () => {
  let service: BeforeAdminLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeforeAdminLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
