import { Injectable } from '@angular/core';
import { EntityID, Evenement, FilActualitePost, UserAction } from '../../entities';
import { VoteEvenement } from '../../entities/vote-evenement';
import { VoteCandidate } from '../../entities/votecandidate';
import { EventState } from '../../enum';
import { ActionStatus } from '../../others/actionstatus';
import { FirebaseDataBaseApi } from '../../utils/services/firebase';
import { AbstractCrudService } from '../abstract-crud/abstractcrud.service';
import { FilActualiteService } from '../fil-actualite/fil-actualite.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import * as db_branch_builder from "./../../utils/functions/db-branch.builder"


@Injectable({
  providedIn: 'root'
})
export class EvenementBussinessService extends AbstractCrudService<Evenement> {
  override 

  constructor(
    firebaseApi:FirebaseDataBaseApi,
    localStorageService:LocalStorageService,
    private filActualiteService:FilActualiteService
  ) {
    super(firebaseApi,localStorageService,"evenements",Evenement)
  }

  createNewEvent(event:Evenement):Promise<ActionStatus<boolean>>
  {
    return this.save(event,db_branch_builder.getBranchOfEvent(event.id))
  }

  updateEvent(event:Evenement):Promise<ActionStatus<boolean>>
  {
    return this.update(event,db_branch_builder.getBranchOfEvent(event.id))
  }

  addCandidate(eventID:EntityID,candidate:VoteCandidate):Promise<ActionStatus<boolean>>
  {
    (<VoteEvenement>this.list.get(eventID.toString())).candidates.push(candidate)
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
    if(eventStatus==EventState.PUBLISHED) 
    {
      let post:FilActualitePost=new FilActualitePost();
      post.datePublication=new Date().getTime();
      post.idEvent.setId(eventID.toString())
      this.list.get(eventID.toString()).datePublication=post.datePublication
      return this.update(this.list.get(eventID.toString()),db_branch_builder.getBranchOfEvent(eventID))
      .then((result)=>this.filActualiteService.addNewPost(post))
    }
    else 
    {
      return this.update(this.list.get(eventID.toString()),db_branch_builder.getBranchOfEvent(eventID))
      .then((result)=>this.filActualiteService.deletePostByEventID(eventID))
    }
  }
}
