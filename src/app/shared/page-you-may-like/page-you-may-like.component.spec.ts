import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageYouMayLikeComponent } from './page-you-may-like.component';

describe('PageYouMayLikeComponent', () => {
  let component: PageYouMayLikeComponent;
  let fixture: ComponentFixture<PageYouMayLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageYouMayLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageYouMayLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
