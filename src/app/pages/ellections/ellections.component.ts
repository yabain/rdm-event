import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityID, Evenement, User } from 'src/app/shared/entities';
import { VoteEvenement } from 'src/app/shared/entities/vote-evenement';
import { EventState } from 'src/app/shared/enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EvenementBussinessService } from 'src/app/shared/services/evenement-bussiness/evenement-bussiness.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';
import { UrlService } from 'src/app/shared/services/url/url.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UtilTime } from 'src/app/shared/utils/functions';
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
  ellectName: string="ÉLLECTIONS";
  ellectDescript: string="Bienvenue dans l'espace qui vous permet d'effectuer des éllections. Nous n'attendons plus que vous pour voter.";
  idToUrl : string;
  idEvent:EntityID=new EntityID()
  event:VoteEvenement;
  owner:User=new User();
  currentUser:User;
  waitResponseChangeStatus:boolean=false;
  waitResponseChangePublish:boolean=false
  constructor(
    private userProfilService: UserProfilService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private evenementService:EvenementBussinessService,
    private userService:UserService,
    private authService:AuthService,
    private notificationService:ToastrNotificationService,
    private urlService: UrlService
  ) { 
  }

  ngOnInit(): void {
    
    let stringId=this.activatedRoute.snapshot.paramMap.get("idEvent")
    if(!stringId) 
    {
      this.notificationService.warningNotification("Pas d'évenement sélectionnez. Vous serez redirigé vers la page des évènements")
      setTimeout(()=>this.router.navigate(["/page/event"]),500)
    }
    this.idEvent.setId(this.activatedRoute.snapshot.paramMap.get("idEvent"))
    this.evenementService.getEventByID(this.idEvent)
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

    this.userProfilService.currentUser.subscribe((user)=>{
      this.currentUser=user;
    })
    this.authService.isLoggedIn.subscribe((isLogged)=>{
      this.isAuth=isLogged
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
  getStringDate(stringDate,stringTime)
  {
    return UtilTime.getReadeableDateFromString(stringDate,stringTime)
  }

  changeStatusPublishedEvent()
  {
    if(this.waitResponseChangePublish) return;
    this.waitResponseChangePublish=true;
    this.evenementService.changeEventState(this.event.id,this.event.state==EventState.PUBLISHED?EventState.UNPUBLISHED:EventState.PUBLISHED)
    .then((result)=>{
      this.waitResponseChangePublish=false;
      this.notificationService.successNofitication(`l'évènement a été ${this.event.state==EventState.PUBLISHED?"publié":"dépublié"} avec succées`)
      this.event=<VoteEvenement>this.evenementService.list.get(this.idEvent.toString())
    })
    .catch((error)=>{
      this.waitResponseChangePublish=false;
      console.log("Error publish event: ",error.message)
      this.notificationService.errorNotification(`Error l'ors de la ${this.event.state==EventState.PUBLISHED?"publication":"dépublication"} de l'évènement: ${error.message}`)
    })
  }
  changeStatusStateEvent()
  {
    if(this.waitResponseChangeStatus) return;
    this.waitResponseChangeStatus=true;
    this.evenementService.changeStatusStarted(this.event.id,this.event.isStarted?false:true)
    .then((value)=>{
      this.waitResponseChangeStatus=false;
      this.notificationService.successNofitication(`l'évènement a été ${this.event.isStarted==true?"démarré":"arreté"} avec succées`);
      this.event=<VoteEvenement>this.evenementService.list.get(this.idEvent.toString())
    })
    .catch((error)=>{
      this.waitResponseChangeStatus=true;
      this.notificationService.errorNotification(`Error l'ors ${this.event.isStarted==true?"du démarrage":"de l'arrêt"} de l'évènement: ${error.message}`)
    })
  }

}
