import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, mergeScan, scan, switchMap, switchMapTo } from 'rxjs/operators';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { ActionStatus } from '../../others/actionstatus';
import { DbBranch } from '../../utils/enum/db-branch.enum';
import { FirebaseDataBaseApi } from '../../utils/services/firebase/FirebaseDatabaseApi';
import { CRequest } from '../../utils/services/http/client/crequest';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { AbstractCrudService } from '../abstract-crud/abstractcrud.service';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import * as db_branch_builder from "./../../utils/functions/db-branch.builder"


@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractCrudService<User> {

  constructor(
    localStorageService:LocalStorageService,
    firebaseApi:FirebaseDataBaseApi,
    private authService:AuthService
  ) {
      super(firebaseApi,localStorageService)
  }


  addUser(user: User): Promise<ActionStatus<void>>
  {
   return this.save(user,db_branch_builder.getBranchOfUsers())
  }

  getAllUser():Promise<ActionStatus<User>>
  {
    return this.findAll(db_branch_builder.getBranchOfUsers())
  }

  findUsersByKey(key:String,value:String):Promise<ActionStatus<User[]>>
  {
    return this.findByKey(key,value,db_branch_builder.getBranchOfUsers())
  }
  createNewAccount(user:User):Promise<ActionStatus<void>>
  {
    return new Promise<ActionStatus<any>>((resolve,reject)=>{
      this.authService.createAccount(user)
      .then((result:ActionStatus<User>)=>this.addUser(result.result))
      .then((result:ActionStatus<void>)=>resolve(result))
      .catch((error)=>reject(error))
    })
  }

  updateUser(user: User):  Promise<ActionStatus<User>> {
    return this.update(user,db_branch_builder.getBranchOfUser(user.id))
  }


}
