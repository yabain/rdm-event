import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomFile } from '../../entities/custom-file';
import { ActionStatus } from '../../others/actionstatus';
import { FirebaseFile } from '../../utils/services/firebase/FirebaseFile.service';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor(
        private firebaseApiFile:FirebaseFile,
    ){}
    uploadFileWithProgression(dir:string,files:CustomFile[]):BehaviorSubject<ActionStatus<any>>
    {
      let result:ActionStatus<any>=new ActionStatus();
      result.result={
        file:"",
        percent:0,
        url:""
      }
      let subject:BehaviorSubject<ActionStatus<any>>=new BehaviorSubject<ActionStatus<any>>(result)
      files.forEach((file:CustomFile)=>this.firebaseApiFile.uploadFile(dir,file).subscribe({
        next:(value)=> {
          result.apiCode=value.apiCode;
          result.result.file=file.name;        
          if(value.apiCode==ActionStatus.SUCCESS) 
          {
            result.result.url=value.result.link;
            result.result.percent=100;
          }
          else result.result.percent=value.result;
          subject.next(result);
        },
        complete:()=>subject.complete()
      }))
      return subject;
    }
    
}
