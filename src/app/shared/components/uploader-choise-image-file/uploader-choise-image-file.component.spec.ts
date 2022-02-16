import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderChoiseImageFileComponent } from './uploader-choise-image-file.component';

describe('UploaderChoiseImageFileComponent', () => {
  let component: UploaderChoiseImageFileComponent;
  let fixture: ComponentFixture<UploaderChoiseImageFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploaderChoiseImageFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderChoiseImageFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
