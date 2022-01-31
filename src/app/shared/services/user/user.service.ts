import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, mergeScan, scan, switchMap, switchMapTo } from 'rxjs/operators';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { ActionStatus } from '../../others/actionstatus';
import { FirebaseDataBaseApi } from '../../utils/services/firebase/FirebaseDatabaseApi';
import { CRequest } from '../../utils/services/http/client/crequest';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { LocalStorageService } from '../localstorage/localstorage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUser: Map<any, User> = new Map<any, User>();
  usersSubject: BehaviorSubject<Map<any, User>> = new BehaviorSubject<Map<any, User>>(this.listUser);



  constructor(
    private localStorageService:LocalStorageService,
    private firebaseApi:FirebaseDataBaseApi
  ) {

    this.localStorageService.getSubjectByKey("data_users").subscribe((value)=>{

      if(!value) return;
      value.forEach((userObj: Record<string | number, any>)=>{
        let user:User=new User();
        user.hydrate(userObj);
        this.listUser.clear();
        this.listUser.set(user.id.toString(),user);
      });

      this.usersSubject.next(this.listUser)
    })
  }

  setListUser(users:Map<String,User>)
  {
    this.localStorageService.setData("data_users",Array.from(users.values()).map((user:User)=>user.toString()))
  }


  getListUser(): User[] {
    let r: User[] = [];
    this.usersSubject.getValue().forEach((value: User) => r.push(value));
    return r;
  }

  setUser(user: User) {
    this.listUser.set(user.id.toString(),user);
    this.setListUser(this.listUser);

  }

  // recuperer les informations d'un utilisateur
  getUserById(userID: EntityID): Promise<ActionStatus<User>> {
    return new Promise<any>((resolve, reject) => {
      if (this.listUser.has(userID.toString())) {
        let result: ActionStatus<User> = new ActionStatus<User>();
        result.result = this.listUser.get(userID.toString());
        return resolve(result);
      }
      this.firebaseApi.fetchOnce(`users/${userID.toString()}`)
        .then((value:ActionStatus<User>)=>{
          let user:User=new User();
          user.hydrate(value.result.getData())
          this.setUser(user);
          value.result=user;
          resolve(value);
        })
        .catch((error:ActionStatus<User>)=>{
          reject(error);
        })
        ;
    });
  }

  findUsersByKey(key:String,value:String):User[]
  {
    return Array.from(this.usersSubject.getValue().values())
      .filter((user:any)=>user[key.toString()]==value)
  }

  updateUser(user: User): Promise<ActionStatus<User>> {
    return new Promise<ActionStatus<User>>((resolve, reject) => {

    });
  }


}
