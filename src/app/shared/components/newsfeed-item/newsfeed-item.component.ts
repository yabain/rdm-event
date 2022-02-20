import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Evenement, FilActualitePost, User, UserAction } from '../../entities';
import { LiketAction } from '../../entities/useraction';
import { VoteEvenement } from '../../entities/vote-evenement';
import { UserActionType } from '../../enum/useraction.enum';
import { VoteEvenementBussinessService } from '../../services/evenement-bussiness/vote-evenement-bussiness.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
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
    private voteEvenementBussinessService:VoteEvenementBussinessService,
    private userProfilService:UserProfilService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
  }

  getReadableDate()
  {
    return UtilTime.getReadeableDateFromDate(new Date(this.post.datePublication))
  }
  makeAction(action)
  {
    let usrAction=this.event.getActionByOwner(action.action,this.userProfilService.currentUser.getValue().id)
    switch(action.action)
    {
      case UserActionType.LIKE_ACTION:
        if(!usrAction)
        {
          let userAction:LiketAction=new LiketAction();
          userAction.date=(new Date()).toISOString();
          userAction.idOwnerAction.setId(this.userProfilService.currentUser.getValue().id.toString())
          this.voteEvenementBussinessService.addAction(this.event.id,userAction);
        }
        else
        {
          this.voteEvenementBussinessService.removeAction(this.event.id,usrAction.id)
        }
    }
  }

}
