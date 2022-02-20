import { TestBed } from '@angular/core/testing';

import { EvenementBuilderService } from './evenement-builder.service';

describe('EvenementBuilderService', () => {
  let service: EvenementBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenementBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
