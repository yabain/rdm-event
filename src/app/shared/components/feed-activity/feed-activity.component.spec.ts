import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedActivityComponent } from './feed-activity.component';

describe('FeedActivityComponent', () => {
  let component: FeedActivityComponent;
  let fixture: ComponentFixture<FeedActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
