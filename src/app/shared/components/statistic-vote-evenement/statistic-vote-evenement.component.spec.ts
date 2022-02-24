import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticVoteEvenementComponent } from './statistic-vote-evenement.component';

describe('StatisticVoteEvenementComponent', () => {
  let component: StatisticVoteEvenementComponent;
  let fixture: ComponentFixture<StatisticVoteEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticVoteEvenementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticVoteEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
