import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityID } from '../../entities/entityid';
import { User } from '../../entities/user';
import { ActionStatus } from '../../others/actionstatus';
import { userBuilder } from '../../utils/functions';
import { EventService } from '../../utils/services/events/event.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserProfilService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private eventService:EventService
    ) {

    this.localStorageService.getSubjectByKey("user_profil").subscribe((userObj:any)=>{
      if(userObj){
        this.currentUser.next(userBuilder(userObj))
      }
    })
    this.eventService.logoutEvent.subscribe((value)=>{
      if(value)
      {
        this.currentUser.next(new User())
      }
    })
  }
  setUser(user:User):void
  {
    this.localStorageService.setData("user_profil",user.toString());
  }
    /*
   * resetPassword is used to reset your password.
   */
    resetPassword() {
      // this.toastr.success('Email Sent');
      // this.router.navigate(['/login']);
    }
    getCurrentUserProfil(userID:EntityID):Promise<ActionStatus<User>>
    {
      return new Promise<ActionStatus<User>>((resolve,reject)=>{
        this.userService.getUserById(userID)
        .then((result:ActionStatus<User>)=>{
          this.setUser(result.result);
          resolve(result);
        })
        .catch((error:ActionStatus<User>)=>reject(error))
      })
    }

    resetDataUser(user:User)
    {
      
    }

    saveUserProfil(user:User):Promise<ActionStatus<User>>
    {
      return new Promise<ActionStatus<User>>((resolve,reject)=>{
        
      })
    }
}
