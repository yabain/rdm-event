import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsListComponent } from './candidats-list.component';

describe('CandidatsListComponent', () => {
  let component: CandidatsListComponent;
  let fixture: ComponentFixture<CandidatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
