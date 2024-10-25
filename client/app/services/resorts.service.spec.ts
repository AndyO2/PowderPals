import { TestBed } from '@angular/core/testing';

import { ResortsService } from './resorts.service';

describe('ResortsService', () => {
  let service: ResortsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResortsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
