import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Evenement, FilActualitePost, User } from '../../entities';
import { VoteEvenement } from '../../entities/vote-evenement';
import { VoteEvenementBussinessService } from '../../services/evenement-bussiness/vote-evenement-bussiness.service';
import { UtilTime } from '../../utils/functions';

@Component({
  selector: 'app-newsfeed-item',
  templateUrl: './newsfeed-item.component.html',
  styleUrls: ['./newsfeed-item.component.scss']
})
export class NewsfeedItemComponent implements OnInit,OnChanges {
  @Input() event:Evenement=new VoteEvenement()
  @Input() owner:User=new User()
  @Input() post:FilActualitePost=new FilActualitePost()
  constructor(
    private voteEvenementBussinessService:VoteEvenementBussinessService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
  }

  getReadableDate()
  {
    return UtilTime.getReadeableDateFromDate(new Date(this.post.datePublication))
  }

}
