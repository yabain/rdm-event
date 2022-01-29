import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNewsfeedFormComponent } from './new-newsfeed-form.component';

describe('NewNewsfeedFormComponent', () => {
  let component: NewNewsfeedFormComponent;
  let fixture: ComponentFixture<NewNewsfeedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNewsfeedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNewsfeedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
