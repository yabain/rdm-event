import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-candidats-list',
  templateUrl: './candidats-list.component.html',
  styleUrls: ['./candidats-list.component.scss']
})
export class CandidatsListComponent implements OnInit {
  isAuth: boolean = false;
  isOwner: boolean = false;
  isAdmin: boolean = false;
  voteStatus: boolean; //true = vote ouvert


  candidatName: string;
  candidatDescription: string;
  candidatCathegorie: string;
  candidatimg1: string;
  candidatimg2: string;
  candidatimg3: string;
  nombreVote : number;
  candidatNum : number;
  metierCandidat : string;

  constructor(
    private isAuthService: AuthService
  ) { 
    this.voteStatus = true;
    this.isAuth = this.isAuthService.isAuth;
    // this.isOwner = true;
    this.isAdmin = this.isAuthService.isAdmin;
    if(this.isAuth){
      if(this.isAdmin){
        this.isOwner = true;
        console.log ('is owner', this.isOwner)
      }
    }
  }

  ngOnInit(): void {
    this.candidatName = "Nom du candidat";
    this.candidatDescription = "La descripiton du candidat";
    this.candidatCathegorie = "Miss";
    this.nombreVote = 60;
    this.candidatNum = 3;
    this.metierCandidat = "Etudiant, Med3";
  }

}
