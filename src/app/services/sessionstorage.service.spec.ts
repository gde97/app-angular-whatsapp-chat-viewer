import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from './sessionstorage.service';

describe('LocalstorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
