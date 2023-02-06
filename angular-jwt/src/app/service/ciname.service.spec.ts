import { TestBed } from '@angular/core/testing';

import { CinameService } from './ciname.service';

describe('CinameService', () => {
  let service: CinameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
