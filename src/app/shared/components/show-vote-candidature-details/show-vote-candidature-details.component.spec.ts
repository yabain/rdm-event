import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVoteCandidatureDetailsComponent } from './show-vote-candidature-details.component';

describe('ShowVoteCandidatureDetailsComponent', () => {
  let component: ShowVoteCandidatureDetailsComponent;
  let fixture: ComponentFixture<ShowVoteCandidatureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVoteCandidatureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVoteCandidatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
