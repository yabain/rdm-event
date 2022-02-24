import { Component, Input, OnInit } from '@angular/core';
import { EntityID } from '../../entities';
import { VoteEvenement } from '../../entities/vote-evenement';

@Component({
  selector: 'app-statistic-vote-evenement',
  templateUrl: './statistic-vote-evenement.component.html',
  styleUrls: ['./statistic-vote-evenement.component.scss']
})
export class StatisticVoteEvenementComponent implements OnInit {
  @Input() event:VoteEvenement;
  color=["bg-purple","bg-primary","bg-blue","bg-breez","bg-yellow"]

  constructor() { }

  ngOnInit(): void {

  }

  getBestVote(categorieID:EntityID)
  {
    return this.event.getBestCandidateByCategorie(categorieID)
  }
}
