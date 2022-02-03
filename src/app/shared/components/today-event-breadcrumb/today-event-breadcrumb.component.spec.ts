import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayEventBreadcrumbComponent } from './today-event-breadcrumb.component';

describe('TodayEventBreadcrumbComponent', () => {
  let component: TodayEventBreadcrumbComponent;
  let fixture: ComponentFixture<TodayEventBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayEventBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayEventBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
