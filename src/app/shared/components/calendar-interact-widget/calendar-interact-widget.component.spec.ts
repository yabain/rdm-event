import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInteractWidgetComponent } from './calendar-interact-widget.component';

describe('CalendarInteractWidgetComponent', () => {
  let component: CalendarInteractWidgetComponent;
  let fixture: ComponentFixture<CalendarInteractWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarInteractWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInteractWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
