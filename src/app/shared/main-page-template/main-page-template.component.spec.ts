import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageTemplateComponent } from './main-page-template.component';

describe('MainPageTemplateComponent', () => {
  let component: MainPageTemplateComponent;
  let fixture: ComponentFixture<MainPageTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
