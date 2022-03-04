import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessUserInfosComponent } from './bussiness-user-infos.component';

describe('BussinessUserInfosComponent', () => {
  let component: BussinessUserInfosComponent;
  let fixture: ComponentFixture<BussinessUserInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BussinessUserInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessUserInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
