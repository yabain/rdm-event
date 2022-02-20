import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityID, Evenement, User } from '../../entities';
import { VoteEvenement } from '../../entities/vote-evenement';
import { UserActionType } from '../../enum/useraction.enum';
import { ActionStatus } from '../../others/actionstatus';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-event-action-list',
  templateUrl: './event-action-list.component.html',
  styleUrls: ['./event-action-list.component.scss']
})
export class EventActionListComponent implements OnInit {
  @Input() event:Evenement=new VoteEvenement()
  @Input() owner:User=new User()
  @Output() doActionEvent:EventEmitter<{action:UserActionType,content:any}>=new EventEmitter()
  message:String=""
  constructor(
    private userProfilService:UserProfilService,
    private authService:AuthService,
    private usersService:UserService
  ) { }

  ngOnInit(): void {
    this.getStringPeopleLike()
  }
  
  getStringPeopleLike(){
    // <a>Mutuelle UdM</a>, <a>Patrick Yankam</a> et
    // <br>47 autres opersonnes aiment.
    let nbreLike=this.event.getLikeNumber()
    if(nbreLike>0)
    {
      if(nbreLike==1)
      {     
        let idLiker:EntityID=this.event.getActionByType(UserActionType.LIKE_ACTION)[0].idOwnerAction 
        if( this.userProfilService.currentUser.getValue().id.toString()==idLiker.toString())
          this.message="Vous aimez";
        else 
          {
            this.usersService.getUserById(idLiker).then((result)=>this.message=`${result.result.getFullName()} aime`)
          }
        }
      else 
      {        
        let posAuthAction=this.event.getPosActionByOwner(UserActionType.LIKE_ACTION,this.userProfilService.currentUser.getValue().id)
        
        if(posAuthAction>=0)
        {
          let authAction=this.event.getActionByOwner(UserActionType.LIKE_ACTION,this.userProfilService.currentUser.getValue().id)
          this.message="vous"
          let idLiker=posAuthAction==0?
            this.event.getActionByType(UserActionType.LIKE_ACTION)[1].idOwnerAction:
            this.event.getActionByType(UserActionType.LIKE_ACTION)[0].idOwnerAction;
          this.usersService.getUserById(idLiker).then((result)=>{
            if(this.event.getLikeNumber()==2) this.message+=` et ${result.result.getFullName()} aimez`
            else this.message+=`, ${result.result.getFullName()} et ${this.event.getLikeNumber()-2} autres personnes amez`
          })
        }
        else {
          let idLiker1:EntityID=this.event.getActionByType(UserActionType.LIKE_ACTION)[0].idOwnerAction 
          let idLiker2:EntityID=this.event.getActionByType(UserActionType.LIKE_ACTION)[1].idOwnerAction 
          Promise.all([this.usersService.getUserById(idLiker1),this.usersService.getUserById(idLiker2)])
          .then((value:ActionStatus<User>[])=>{
            this.message=`${value[0].result.getFullName()}`;
            if(this.event.getLikeNumber()==2) this.message+=`et ${value[1].result.getFullName()} aiment`
            else this.message+=`, ${value[1].result.getFullName()} et ${this.event.getLikeNumber()-2} autres personnes aiment`
          })
          .catch((error)=>{

          })
        }
      }

    }
  }

  like()
  {
    console.log("like")
    this.doActionEvent.emit({action:UserActionType.LIKE_ACTION,content:""})
  }
  comment()
  {

  }

}
