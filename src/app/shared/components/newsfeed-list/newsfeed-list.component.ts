import { Component, OnInit } from '@angular/core';
import { Evenement, FilActualitePost, User } from '../../entities';
import { ActionStatus } from '../../others/actionstatus';
import { AuthService } from '../../services/auth/auth.service';
import { VoteEvenementBussinessService } from '../../services/evenement-bussiness/vote-evenement-bussiness.service';
import { FilActualiteService } from '../../services/fil-actualite/fil-actualite.service';
import { UserService } from '../../services/user/user.service';
import { ToastrNotificationService } from '../../utils/services/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-newsfeed-list',
  templateUrl: './newsfeed-list.component.html',
  styleUrls: ['./newsfeed-list.component.scss']
})
export class NewsfeedListComponent implements OnInit {
  isAuth: boolean = false;
  isOwner: boolean = true;
  isAdmin: boolean = false;
  newsfeed:FilActualitePost[]=[];
  events:Evenement[]=[];
  users:User[]=[]
  hasLoadedData:boolean=false;

  constructor(
    private isAuthService: AuthService,
    private filActualiteService:FilActualiteService,
    private voteEvenementBussinessService:VoteEvenementBussinessService,
    private usersService:UserService,
    private notificationService:ToastrNotificationService
  ) { 
    this.isAuth = this.isAuthService.isAuth;
    // this.isOwner = true;
    this.isAdmin = this.isAuthService.isAdmin;
    this.isAdminer(this.isAdmin);
  }

  isAdminer(isAdmin : boolean){
    if (isAdmin){
      this.isOwner == true;
    }
  }

  ngOnInit(): void {
    // this.isAdminer(this.isAdmin);
    this.loadData()
  }

  loadData()
  {
    this.hasLoadedData=false;
    this.filActualiteService.loadNewBunchData()
    .then((value:ActionStatus<FilActualitePost[]>)=>{
      this.newsfeed=[...this.newsfeed,...value.result];
      // console.log("value",value)
      return Promise.all([...value.result.map((filActualite)=>this.voteEvenementBussinessService.getEventByID(filActualite.idEvent))])
    })
    .then((value:ActionStatus<Evenement>[])=>{
      this.events=[...this.events,...value.map((result)=>result.result)];
      return Promise.all([...value.map((result:ActionStatus<Evenement>)=>this.usersService.getUserById(result.result.eventOwner))])
    })
    .then((value:ActionStatus<User>[])=>{
      this.users=[...this.users,...value.map((result)=>result.result)];
      this.hasLoadedData=true;
    })
    .catch((error)=>{
      this.notificationService.errorNotification(`Erreur de chargement des données: ${error.message}; Veuillez actualiser la page`)
      this.hasLoadedData=true;
    })
  }

  getUser()
  {

  }

}
