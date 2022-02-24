import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../entities';
import { VoteAction } from '../../entities/useraction';
import { VoteEvenement } from '../../entities/vote-evenement';
import { VoteCandidate } from '../../entities/votecandidate';
import { AuthService } from '../../services/auth/auth.service';
import { VoteEvenementBussinessService } from '../../services/evenement-bussiness/vote-evenement-bussiness.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
import { UserService } from '../../services/user/user.service';
import { ToastrNotificationService } from '../../utils/services/toastr-notification/toastr-notification.service';

// declare var Swiper:any;
declare var $:any;

@Component({
  selector: 'app-show-vote-candidature-details',
  templateUrl: './show-vote-candidature-details.component.html',
  styleUrls: ['./show-vote-candidature-details.component.scss']
})
export class ShowVoteCandidatureDetailsComponent implements OnInit, OnChanges {
  @Input() idComponent:String="show-vote-candidature-detail-modal"
  @Input() candidate:VoteCandidate=new VoteCandidate();
  @Input() event:VoteEvenement=new VoteEvenement();
  @Input() userOwner:User=new User();
  @Output() hasMakeAction:EventEmitter<boolean>=new EventEmitter<boolean>()
  waitForResponseVote:boolean=false;
  currentUser:User;
  isAuth:boolean=false;
  swipers:any={}
  hasAlreadyMakeVoteToCategorie=false;
  hasAlreadyMakeVoteToCategorieAndCandidate=false;
  constructor(
    private evenementService:VoteEvenementBussinessService,
    private userService:UserService,
    private userProfilService:UserProfilService,
    private authService:AuthService,
    private notificationService:ToastrNotificationService
    ) { }
  

  ngOnInit(): void {
    this.userProfilService.currentUser.subscribe((user)=>{
      if(!user) return;
      this.currentUser=user;     
    })

    this.authService.isLoggedIn.subscribe((auth)=>{
      this.isAuth=auth;
    })    
  } 
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['candidate'])
    { 
      if(this.event.name=="") return;
      console.log("voteID ",this.event)
      this.hasAlreadyMakeVoteToCategorieAndCandidate=this.event.getVoteByCategorieVoterAndCandidate(this.candidate.idCategori,this.currentUser.id,this.candidate.id)!=undefined;
      this.hasAlreadyMakeVoteToCategorie=this.event.getVoteByCategorieAndVoter(this.candidate.idCategori,this.currentUser.id)!=undefined;
      console.log("Vote ",this.hasAlreadyMakeVoteToCategorieAndCandidate,this.hasAlreadyMakeVoteToCategorie)
    
    }
  }

  addOrRemoveVote()
  {
    if(this.waitForResponseVote) return;
    this.waitForResponseVote=true;
    let isAdd=true;
    let promise;
    
    if(!this.hasAlreadyMakeVoteToCategorie)
    {
      let vote:VoteAction=new VoteAction();
      vote.date=(new Date()).toISOString();
      vote.idCandidateSelected.setId(this.candidate.id.toString());
      vote.idCategorieCategorieSelected.setId(this.candidate.idCategori.toString());
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
      $(`#${this.idComponent}`).modal('toggle')
      this.hasMakeAction.emit(true)
    })
    .catch((error)=>{
      this.waitForResponseVote=false;
      this.notificationService.errorNotification(`Votre vote n'a pas pu etre ${isAdd==true?"ajouté":"retiré"} du a une erreur: ${error.message}`)
      console.log("Error Add/remove vote ",error)
    })
  }
}
