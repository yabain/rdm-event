import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventActionListComponent } from './event-action-list.component';

describe('EventActionListComponent', () => {
  let component: EventActionListComponent;
  let fixture: ComponentFixture<EventActionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventActionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
