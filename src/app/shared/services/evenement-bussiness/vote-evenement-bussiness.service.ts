import { Injectable } from "@angular/core";
import { EntityID } from "../../entities";
import { CategorieEvenement, VoteEvenement } from "../../entities/vote-evenement";
import { VoteCandidate } from "../../entities/votecandidate";
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
    addCathegorie(eventID:EntityID,cathegorie:CategorieEvenement):Promise<ActionStatus<boolean>>
    {
        console.log("Vote ",this.list.get(eventID.toString()) as VoteEvenement);
        (<VoteEvenement>this.list.get(eventID.toString())).categories.push(cathegorie)
        return this.updateEvent(this.list.get(eventID.toString()))
    }
    addCandidate(eventID:EntityID,candidate:VoteCandidate):Promise<ActionStatus<boolean>>
    {
        (<VoteEvenement>this.list.get(eventID.toString())).candidates.push(candidate)
        return this.updateEvent(this.list.get(eventID.toString()))
    }
  }
