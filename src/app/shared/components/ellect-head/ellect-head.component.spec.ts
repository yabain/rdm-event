import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllectHeadComponent } from './ellect-head.component';

describe('EllectHeadComponent', () => {
  let component: EllectHeadComponent;
  let fixture: ComponentFixture<EllectHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EllectHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EllectHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
