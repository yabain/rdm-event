import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../entities';
import { VoteAction } from '../../entities/useraction';
import { VoteEvenement } from '../../entities/vote-evenement';
import { VoteCandidate } from '../../entities/votecandidate';
import { AuthService } from '../../services/auth/auth.service';
import { VoteEvenementBussinessService } from '../../services/evenement-bussiness/vote-evenement-bussiness.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
import { UserService } from '../../services/user/user.service';
import { ToastrNotificationService } from '../../utils/services/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-show-vote-candidature-details',
  templateUrl: './show-vote-candidature-details.component.html',
  styleUrls: ['./show-vote-candidature-details.component.scss']
})
export class ShowVoteCandidatureDetailsComponent implements OnInit {
  @Input() idComponent:String="show-vote-candidature-detail-modal"
  @Input() candidate:VoteCandidate;
  @Input() event:VoteEvenement;
  @Input() userOwner:User;
  @Output() hasMakeAction:EventEmitter<boolean>=new EventEmitter<boolean>()
  waitForResponseVote:boolean=false;
  currentUser:User;
  isAuth:boolean=false;
  constructor(
    private evenementService:VoteEvenementBussinessService,
    private userService:UserService,
    private userProfilService:UserProfilService,
    private authService:AuthService,
    private notificationService:ToastrNotificationService
    ) { }

  ngOnInit(): void {
    this.userProfilService.currentUser.subscribe((user)=>{
      this.currentUser=user
    })

    this.authService.isLoggedIn.subscribe((auth)=>{
      this.isAuth=auth;
    })
    
  } 
  hasAlreadyVote()
  {
    let vote=this.event.getVoteActionByOwner(this.currentUser.id)
    return vote!=undefined && vote !=null;
  }
  addOrRemoveVote()
  {
    if(this.waitForResponseVote) return;
    this.waitForResponseVote=true;
    let isAdd=true;
    let promise;
    

    if(this.hasAlreadyVote())
    {
      let vote:VoteAction=new VoteAction();
      vote.date=(new Date()).toISOString();
      vote.idCandidateSelected.setId(this.candidate.id.toString());
      vote.idOwnerAction.setId(this.currentUser.id.toString());
      promise=this.evenementService.addVote(this.event.id,vote,this.currentUser.id,this.candidate.id)
    }
    else 
    {
      promise=this.evenementService.removeVote(this.currentUser.id,this.event.id)
      isAdd=false;
    }

    promise.then((result)=>{
      this.waitForResponseVote=false;
      if(isAdd) this.notificationService.successNofitication(`Votre vote sur le candidate N°${this.candidate.num} a été bien enregistré`)
      else this.notificationService.warningNotification(`Vous avez retirer votre vote sur le candidat N°${this.candidate.num}. Vous pouvez de nouveau faire un choix`)
    })
    .catch((error)=>{
      this.waitForResponseVote=false;
      this.notificationService.errorNotification(`Votre vote n'a pas pu etre ${isAdd==true?"ajouté":"retiré"} du a une erreur: ${error.message}`)
      console.log("Error Add/remove vote ",error)
    })
  }
}
