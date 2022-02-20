import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from '../../entities';
import { VoteEvenement } from '../../entities/vote-evenement';

@Component({
  selector: 'app-event-action-list',
  templateUrl: './event-action-list.component.html',
  styleUrls: ['./event-action-list.component.scss']
})
export class EventActionListComponent implements OnInit {
  @Input() event:Evenement=new VoteEvenement()
  constructor() { }

  ngOnInit(): void {
  }

}
