import { TestBed } from '@angular/core/testing';

import { OtServiceService } from './ot-service.service';

describe('OtServiceService', () => {
  let service: OtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
