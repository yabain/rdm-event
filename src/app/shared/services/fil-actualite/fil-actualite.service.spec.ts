import { TestBed } from '@angular/core/testing';

import { FilActualiteService } from './fil-actualite.service';

describe('FilActualiteService', () => {
  let service: FilActualiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilActualiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
