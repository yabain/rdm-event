import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowModalDetailsEventComponent } from './show-modal-details-event.component';

describe('ShowModalDetailsEventComponent', () => {
  let component: ShowModalDetailsEventComponent;
  let fixture: ComponentFixture<ShowModalDetailsEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowModalDetailsEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowModalDetailsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
