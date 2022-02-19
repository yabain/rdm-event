import { Injectable } from '@angular/core';
import { Entity, EntityID, Evenement, FilActualitePost, UserAction } from '../../entities';
import { CategorieEvenement, VoteEvenement } from '../../entities/vote-evenement';
import { VoteCandidate } from '../../entities/votecandidate';
import { EventState } from '../../enum';
import { ActionStatus } from '../../others/actionstatus';
import { UtilTime } from '../../utils/functions';
import { EventService } from '../../utils/services/events/event.service';
import { FirebaseDataBaseApi } from '../../utils/services/firebase';
import { AbstractCrudService } from '../abstract-crud/abstractcrud.service';
import { FilActualiteService } from '../fil-actualite/fil-actualite.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { UserProfilService } from '../user-profil/user-profil.service';
import * as db_branch_builder from "./../../utils/functions/db-branch.builder"


@Injectable({ 
  providedIn: 'root'
})
export abstract class EvenementBussinessService<T extends Evenement=Evenement> extends AbstractCrudService<T> {
 
  private startDate:Date=new Date();
  private endDate:Date=new Date()
  private currentDate:Date=new Date()
  constructor(
    firebaseApi:FirebaseDataBaseApi,
    localStorageService:LocalStorageService,
    protected userProfilService:UserProfilService,
    protected eventService:EventService,
    protected filActualiteService:FilActualiteService
  ) {
    super(firebaseApi,localStorageService,"evenements")
    this.startDate.setDate(1);
    this.endDate=new Date(this.startDate.getFullYear(),this.startDate.getMonth()+1,0);
    this.loadNewBunchData()
    this.eventService.loginEvent.subscribe((value)=>{
      if(value) 
      {

      }
    })
  }
  loadNewBunchData()
  {
    this.firebaseApi
    .getFirebaseDatabase()
    .ref(db_branch_builder.getBranchOfEvents())
    .orderByChild("endDateTime")
    .startAt(this.currentDate.getTime())
    .once("value",(dataSnapshot)=>{
      let data=dataSnapshot.val()
      for(let k in data)
      {
        let event=this.hydrateObjet(data[k]);
        let d = UtilTime.getDateFromString(event.startDate);
        if(this.currentDate>=d) this.setObject(event)
      }
    })
  }

  createNewEvent(event:T):Promise<ActionStatus<boolean>>
  {
    return this.save(event,db_branch_builder.getBranchOfEvent(event.id))
  }

  updateEvent(event:T):Promise<ActionStatus<boolean>>
  {
    return this.update(event,db_branch_builder.getBranchOfEvent(event.id))
  }

  getEventByID(eventID:EntityID):Promise<ActionStatus<Evenement>>
  {
    return this.findByID(eventID,db_branch_builder.getBranchOfEvents())
  }

  
  changeStatusStarted(eventID:EntityID,value:boolean=false):Promise<ActionStatus<boolean>>
  {
    this.list.get(eventID.toString()).isStarted=value;
    return this.updateEvent(this.list.get(eventID.toString()))
  }

  addAction(eventID:EntityID,userAction:UserAction):Promise<ActionStatus<boolean>>
  {
    this.list.get(eventID.toString()).actions.push(userAction)
    return this.updateEvent(this.list.get(eventID.toString()))
  }
  
  
  changeEventState(eventID:EntityID,eventStatus:EventState):Promise<ActionStatus<boolean>>
  {

    this.list.get(eventID.toString()).state=eventStatus;
    this.list.get(eventID.toString()).datePublication=0;

    console.log("event ",this.list.get(eventID.toString()))

    let post:FilActualitePost=new FilActualitePost();
    post.idEvent.setId(eventID.toString())
    post.id.setId(eventID.toString())

    if(eventStatus==EventState.PUBLISHED) 
    {
      post.datePublication=new Date().getTime();
      this.list.get(eventID.toString()).datePublication=post.datePublication
      return this.update(this.list.get(eventID.toString()),db_branch_builder.getBranchOfEvent(eventID))
      .then((result)=>this.filActualiteService.addNewPost(post))
    }
    else 
    {
      return this.update(this.list.get(eventID.toString()),db_branch_builder.getBranchOfEvent(eventID))
      .then((result)=>this.filActualiteService.deletePost(post))
    }
  }
}
