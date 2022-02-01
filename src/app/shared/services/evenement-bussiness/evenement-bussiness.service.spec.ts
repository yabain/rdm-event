import { TestBed } from '@angular/core/testing';

import { EvenementBussinessService } from './evenement-bussiness.service';

describe('EvenementBussinessService', () => {
  let service: EvenementBussinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenementBussinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
