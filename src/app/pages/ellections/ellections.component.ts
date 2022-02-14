import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityID, Evenement, User } from 'src/app/shared/entities';
import { VoteEvenement } from 'src/app/shared/entities/vote-evenement';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EvenementBussinessService } from 'src/app/shared/services/evenement-bussiness/evenement-bussiness.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';
import { UrlService } from 'src/app/shared/services/url/url.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ToastrNotificationService } from 'src/app/shared/utils/services/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-ellections',
  templateUrl: './ellections.component.html',
  styleUrls: ['./ellections.component.scss']
})
export class EllectionsComponent implements OnInit {
  isOwner : boolean = false;
  isAuth : boolean = false;
  ellectStatus : boolean = true; // status de l'éllection, true si ouvert, false si cloturé.
  ellectName: string;
  ellectDescript: string;
  idToUrl : string;
  event:VoteEvenement;
  owner:User=new User();

  constructor(
    private userProfilService: UserProfilService,
    private activatedRoute:ActivatedRoute,
    private evenementService:EvenementBussinessService,
    private userService:UserService,
    authService:AuthService,
    private notificationService:ToastrNotificationService,
    private urlService: UrlService
  ) { 
    this.isAuth = authService.isAuth;
    this.isAdminer(authService.isAdmin);
    this.getUrl();

    if(!this.ellectName){
      this.ellectName = "ÉLLECTIONS"
    }
    if(!this.ellectDescript){
      this.ellectDescript = "Bienvenue dans l'espace qui vous permet d'effectuer des éllections. Nous n'attendons plus que vous pour voter."
    }
  }

  ngOnInit(): void {
    let id:EntityID=new EntityID()
    id.setId(this.activatedRoute.snapshot.paramMap.get("idEvent"))
    this.evenementService.getEventByID(id)
    .then((value)=>{
      this.event=value.result
      return this.userService.getUserById(this.event.eventOwner)
    })
    .then((value)=>{
      this.owner=value.result
    })
    .catch((error)=>{
      console.log("Error ",error)
      this.notificationService.errorNotification(`Une erreur est survenue: ${error.message}`)
    })
  }

  isAdminer(isAdmin){
    if(isAdmin){
      this.isOwner = true
    }
  }

  getUrl(){
    this.idToUrl = this.urlService.getEllectIdToUrl();
  }

}
