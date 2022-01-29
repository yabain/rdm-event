import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideMenuListFriendComponent } from './right-side-menu-list-friend.component';

describe('RightSideMenuListFriendComponent', () => {
  let component: RightSideMenuListFriendComponent;
  let fixture: ComponentFixture<RightSideMenuListFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSideMenuListFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSideMenuListFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
