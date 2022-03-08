import { TestBed } from '@angular/core/testing';

import { ExistsService } from './exists.service';

describe('ExistsService', () => {
  let service: ExistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
