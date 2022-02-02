import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllectionsComponent } from './ellections.component';

describe('EllectionsComponent', () => {
  let component: EllectionsComponent;
  let fixture: ComponentFixture<EllectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EllectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EllectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
