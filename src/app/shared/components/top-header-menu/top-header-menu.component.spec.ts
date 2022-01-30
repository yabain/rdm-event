import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeaderMenuComponent } from './top-header-menu.component';

describe('TopHeaderMenuComponent', () => {
  let component: TopHeaderMenuComponent;
  let fixture: ComponentFixture<TopHeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeaderMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
