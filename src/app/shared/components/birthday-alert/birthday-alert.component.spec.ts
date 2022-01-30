import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayAlertComponent } from './birthday-alert.component';

describe('BirthdayAlertComponent', () => {
  let component: BirthdayAlertComponent;
  let fixture: ComponentFixture<BirthdayAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
