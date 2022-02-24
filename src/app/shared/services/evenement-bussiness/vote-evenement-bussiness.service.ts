import { Injectable } from "@angular/core";
import { EntityID } from "../../entities";
import { VoteAction } from "../../entities/useraction";
import { CategorieEvenement, VoteEvenement } from "../../entities/vote-evenement";
import { VoteCandidate } from "../../entities/votecandidate";
import { UserActionType } from "../../enum/useraction.enum";
import { ActionStatus } from "../../others/actionstatus";
import { EventService } from "../../utils/services/events/event.service";
import { FirebaseDataBaseApi } from "../../utils/services/firebase";
import { FilActualiteService } from "../fil-actualite/fil-actualite.service";
import { LocalStorageService } from "../localstorage/localstorage.service";
import { UserProfilService } from "../user-profil/user-profil.service";
import { EvenementBussinessService } from "./evenement-bussiness.service";

@Injectable({ 
    providedIn: 'root'
  })
  export class VoteEvenementBussinessService extends EvenementBussinessService<VoteEvenement> {
    
    
    constructor(
        firebaseApi:FirebaseDataBaseApi,
        localStorageService:LocalStorageService,
        userProfilService:UserProfilService,
        eventService:EventService,
        filActualiteService:FilActualiteService
      ) {
        super(firebaseApi,localStorageService,userProfilService,eventService,filActualiteService)
      }
    createInstance(): VoteEvenement {
      return new VoteEvenement()
    }
    hydrateObjet(entity: Record<string, any>): VoteEvenement {
      let instance=this.createInstance();
      instance.hydrate(entity);
      return instance
    }
    addCathegorie(eventID:EntityID,cathegorie:CategorieEvenement):Promise<ActionStatus<boolean>>
    {
        (<VoteEvenement>this.list.get(eventID.toString())).categories.push(cathegorie)
        return this.updateEvent(this.list.get(eventID.toString()))
    }
    addCandidate(eventID:EntityID,candidate:VoteCandidate):Promise<ActionStatus<boolean>>
    {
        (<VoteEvenement>this.list.get(eventID.toString())).candidates.push(candidate)
        return this.updateEvent(this.list.get(eventID.toString()))
    }
    addVote(eventID:EntityID,vote:VoteAction,userVoter:EntityID,candidateID:EntityID):Promise<ActionStatus<boolean>>
    {
      let event=this.list.get(eventID.toString())
      if(event.getVoteByCategorieAndVoter(event.getCandidateByID(candidateID).idCategori, userVoter)!=undefined){
        let action=new ActionStatus<boolean>()
        action.result=true;
        return Promise.resolve(action);
      }
      event.actions.push(vote);
      return this.updateEvent(event)
    }
    removeVote(userVoter:EntityID,eventID:EntityID):Promise<ActionStatus<boolean>>
    {
      let event=this.list.get(eventID.toString());
      let actionPos=event.actions.findIndex((action)=>action.actionType==UserActionType.VOTE_ACTION && action.idOwnerAction.toString()==userVoter.toString())
      if(actionPos<0) {
        let action=new ActionStatus<boolean>()
        action.result=true;
        return Promise.resolve(action);
      }
      event.actions.splice(actionPos,1);
      return this.updateEvent(event)
    }

  }
