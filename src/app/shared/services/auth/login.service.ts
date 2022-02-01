import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserProfilService } from '../user-profil/user-profil.service';
import { EntityID } from '../../entities/entityid';
import { EventService } from '../../utils/services/events/event.service';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user';
import { RestApiClientService } from '../../utils/services/http/client/rest-api-client.service';
import { CRequest } from '../../utils/services/http/client/crequest';
import { CResponse } from '../../utils/services/http/client/cresponse';
import { ActionStatus } from '../../others/actionstatus';
import { FilActualiteService } from '../fil-actualite/fil-actualite.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService:AuthService,
    private userProfil:UserProfilService,
    private eventService:EventService,
    private usersService:UserService,
    private filActualiteService:FilActualiteService,
    private restApiService:RestApiClientService
  ) { }

  loginUser(user:User):Promise<ActionStatus<boolean>>
  {
    return new Promise<ActionStatus<boolean>>((resolve,reject)=>{
      this.authService.authLogin(user)
      .then((result:ActionStatus<boolean>)=> this.filActualiteService.loadNewBunchData())
      .then((result:ActionStatus<boolean>)=>{
        user=result.result;
        // this.userProfil.setUser(user);
        if(result.apiCode==ActionStatus.NOT_VALID_ACCOUNT_ERROR) result.code=ActionStatus.SUCCESS;
        else result.code=ActionStatus.SUCCESS_END;
        this.eventService.loginEvent.next(true);
        return resolve(result);
      })
      .catch((error:ActionStatus<boolean>)=>{
        reject(error)
      })
    })
  }

  // registerPlateform():Promise<ActionStatus>
  // {
  //   return new Promise<ActionStatus>((resolve,reject)=>{
  //     this.restApiService.sendRequest(new CRequest()
  //     .url("deviceused?deviceplateform=4")
  //     .json()
  //     .header("Authorization",`Bearer ${this.restApiService.headerKey.getValue().get("token")}`)
  //     .put()
  //     )
  //     .then((result:ActionStatus)=>{
  //       let response:CResponse=result.result
  //       result.result=response.getData();
  //       resolve(result)
  //     })
  //     .catch((error:ActionStatus)=>reject(error))
  //   })
  // }

}
