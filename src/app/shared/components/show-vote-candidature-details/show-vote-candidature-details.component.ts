import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../entities';
import { VoteEvenement } from '../../entities/vote-evenement';
import { VoteCandidate } from '../../entities/votecandidate';
import { AuthService } from '../../services/auth/auth.service';
import { VoteEvenementBussinessService } from '../../services/evenement-bussiness/vote-evenement-bussiness.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
import { UserService } from '../../services/user/user.service';

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
  currentUser:User;
  isAuth:boolean=false;
  constructor(
    private evenementService:VoteEvenementBussinessService,
    private userService:UserService,
    private userProfilService:UserProfilService,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.userProfilService.currentUser.subscribe((user)=>{
      this.currentUser=user
    })

    this.authService.isLoggedIn.subscribe((auth)=>{
      this.isAuth=auth;
    })
    
  } 

}
