import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidats-list',
  templateUrl: './candidats-list.component.html',
  styleUrls: ['./candidats-list.component.scss']
})
export class CandidatsListComponent implements OnInit {
  isAuth: boolean;
  isAdmin: boolean;
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


  constructor() { 
    this.voteStatus = true;
    this.isAuth = true;
    this.isAdmin = true;
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
