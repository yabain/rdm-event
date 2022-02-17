import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { CustomFile } from 'src/app/shared/entities/custom-file';
import { EntityID } from 'src/app/shared/entities/entityid';
import { ActionStatus } from 'src/app/shared/others/actionstatus';
import { FireBaseConstant } from './firebase-constant';
import { FirebaseDataBaseApi } from './FirebaseDatabaseApi';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFile {
  db:any;
  constructor(private firebaseDatabaseApi:FirebaseDataBaseApi) {
    this.db=this.firebaseDatabaseApi.getFirebaseFile().ref();
   }
  uploadFile(repos:string,file:CustomFile):BehaviorSubject<ActionStatus>
  {
    let result:ActionStatus=new ActionStatus();
    result.result=0;

    let subject:BehaviorSubject<ActionStatus>=new BehaviorSubject<ActionStatus>(result);

    let uploadTask=this.db.child(`${repos}/${(new EntityID()).toString()}.${file.getExtention()}`).put(file.data,{
      contentType:file.type
    })
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot)=>
      {
        result.result=Math.trunc((snapshot.bytesTransferred/snapshot.totalBytes) *100);
        switch(snapshot.state)
        {
          case firebase.storage.TaskState.PAUSED:
            result.apiCode=ActionStatus.UPLOAD_PAUSED;            
            subject.next(result);
            break;
          case firebase.storage.TaskState.RUNNING:
            result.apiCode=ActionStatus.UPLOAD_RUNNING;
            subject.next(result)
            break;
        }
      },
      (error)=>{
        result.apiCode=error.code;
        subject.error(result);
      },
      ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
          file.link=downloadURL;
          result.apiCode=ActionStatus.SUCCESS;
          result.result=file;
          subject.next(result);
          subject.complete()
        })
      }
    )
    return subject;
  }

  listAll(url=""):Promise<ActionStatus<CustomFile[]>>
  {
    return new Promise<ActionStatus>((resolve,reject)=>{
      let actionResult=new ActionStatus<CustomFile[]>()
      this.db.child(url).listAll()
      .then((res)=>{
      
        actionResult.result=res.items.map((itemRef)=>{
          let custom:CustomFile=new CustomFile()
          custom.name=itemRef.name;
          custom.link=itemRef.getDownloadURL();
          return custom;
        })
        return Promise.all(actionResult.result.map((custom)=>custom.link))
      })
      .then((result:ActionStatus[])=>{
        for(let i=0;i<result.length;i++)
        {
          actionResult.result[i].link=result[i];
        } 
        console.log("Erreur ",actionResult.result)        
        resolve(actionResult)
      })
      .catch((error)=>{
        console.log("Error ",error)
        actionResult.apiCode=error.code;
        actionResult.result=error;
        actionResult.message=error.message;
        this.firebaseDatabaseApi.handleApiError(error);
        reject(error)
      })
    })
  }
  
}

