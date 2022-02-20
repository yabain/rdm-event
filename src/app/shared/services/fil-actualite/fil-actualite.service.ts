import { Injectable } from '@angular/core';
import { EntityID, FilActualitePost } from '../../entities';
import { ActionStatus } from '../../others/actionstatus';
import { EventService } from '../../utils/services/events/event.service';
import { FirebaseDataBaseApi } from '../../utils/services/firebase';
import { FirebaseCursor } from '../../utils/services/firebase/firebase-cursor';
import { AbstractCrudService } from '../abstract-crud/abstractcrud.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import * as db_branch_builder from "./../../utils/functions/db-branch.builder"

@Injectable({
  providedIn: 'root'
})
export class FilActualiteService extends AbstractCrudService<FilActualitePost> {
  
  protected cursorForLoadSegmentData:any="";
  protected maxPageLoad=5;
  protected cursor:FirebaseCursor;

  constructor(
    firebaseApi:FirebaseDataBaseApi,
    localStrogeService:LocalStorageService,
    private eventService:EventService
  ) { 
    super(firebaseApi,localStrogeService,"fil_actualite")

    this.eventService.loginEvent.subscribe((login)=>{
      if(login) this.loadNewBunchData();
    })
    this.cursor=new FirebaseCursor(
      this.firebaseApi.getFirebaseDatabase()
      .ref(db_branch_builder.getBranchOfFilActualites())
      .orderByChild("datePublication"),this.maxPageLoad,
      "datePublication"
    )
    
  }
  createInstance(): FilActualitePost {
    return new FilActualitePost()
  }
  loadNewBunchData():Promise<ActionStatus<FilActualitePost[]>>
  {
    return new Promise<ActionStatus<boolean>>((resolve,reject)=>{
      let data=[]
      let resultAction=new ActionStatus();
      this.cursor.next()
      .then((result)=>{
        result.result.forEach((obj)=>{
          let instance=this.hydrateObjet(obj);
          data.push(instance);
          this.setObject(instance)
        })
        resultAction.result=data;
        resolve(resultAction)
      })
      .catch((error)=>reject(error))
    })
  }
  addNewPost(post:FilActualitePost):Promise<ActionStatus<void>>
  {
    return this.save(post,db_branch_builder.getBranchOfFilActualite(post.id))
  }

  deletePost(post:FilActualitePost):Promise<ActionStatus<boolean>>
  {
    return this.delete(post,db_branch_builder.getBranchOfFilActualite(post.id))
  }

  deletePostByEventID(eventID):Promise<ActionStatus<boolean>>
  {
    let r:ActionStatus<boolean>=new ActionStatus<boolean>(); 

    return new Promise<ActionStatus<boolean>>((resolve,reject)=>{
      this.findByKey("idEvent",eventID.toString(),db_branch_builder.getBranchOfFilActualites())
      .then((result)=>{
        if(result.result.length==0) 
        {
          r.result=true;
          return Promise.resolve(r)
        }
        let post = result.result[0];
        return this.delete(post,db_branch_builder.getBranchOfFilActualite(post.id))
      })
      .then((result)=>{
        r.result=true;
        resolve(r)
      })
      .catch((error)=>{
        r.result=false;
        reject(r);
      })

    })
  }
}
