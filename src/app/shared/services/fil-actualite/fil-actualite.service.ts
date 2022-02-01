import { Injectable } from '@angular/core';
import { EntityID, FilActualitePost } from '../../entities';
import { ActionStatus } from '../../others/actionstatus';
import { FirebaseDataBaseApi } from '../../utils/services/firebase';
import { AbstractCrudService } from '../abstract-crud/abstractcrud.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import * as db_branch_builder from "./../../utils/functions/db-branch.builder"

@Injectable({
  providedIn: 'root'
})
export class FilActualiteService extends AbstractCrudService<FilActualitePost> {

  constructor(
    firebaseApi:FirebaseDataBaseApi,
    localStrogeService:LocalStorageService
  ) { 
    super(firebaseApi,localStrogeService)
    this.localstorage_key="fil_actualite"
  }

  addNewPost(post:FilActualitePost):Promise<ActionStatus<void>>
  {
    return this.save(post,db_branch_builder.getFilActualite(post.id))
  }

  deletePost(post:FilActualitePost):Promise<ActionStatus<boolean>>
  {
    return this.delete(post,db_branch_builder.getFilActualite(post.id))
  }

  deletePostByEventID(eventID):Promise<ActionStatus<boolean>>
  {
    let r:ActionStatus<boolean>=new ActionStatus<boolean>(); 

    return new Promise<ActionStatus<boolean>>((resolve,reject)=>{
      this.findByKey("idEvent",eventID.toString(),db_branch_builder.getFilActualites())
      .then((result)=>{
        if(result.result.length==0) 
        {
          r.result=true;
          return Promise.resolve(r)
        }
        let post = result.result[0];
        return this.delete(post,db_branch_builder.getFilActualite(post.id))
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
