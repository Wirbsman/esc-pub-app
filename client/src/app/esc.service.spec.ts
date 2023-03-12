import { TestBed } from '@angular/core/testing';

import { EscService } from './esc.service';

describe('EscService', () => {
  let service: EscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
