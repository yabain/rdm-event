import { BehaviorSubject } from "rxjs";
import { Entity } from "../../entities/entity";
import { EntityID } from "../../entities/entityid";
import { ActionStatus } from "../../others/actionstatus";
import { FirebaseDataBaseApi } from "../../utils/services/firebase";
import { LocalStorageService } from "../localstorage/localstorage.service";

export abstract class AbstractCrudService<T extends Entity>
{
    localstorage_key=""
    list: Map<any, T> = new Map<any, T>();
    listSubject: BehaviorSubject<Map<any, T>> = new BehaviorSubject<Map<any, T>>(this.list);

    constructor(
        private firebaseApi:FirebaseDataBaseApi,
        private localStorageService:LocalStorageService,
        
        )
    {
        this.localStorageService.getSubjectByKey(this.localstorage_key).subscribe((value)=>{

            if(!value) return;
            value.forEach((obj: Record<string | number, any>)=>{
              let instance:T= <T> new Entity();
              instance.hydrate(obj);
              this.list.clear();
              this.list.set(instance.id.toString(),instance);
            });
      
            this.listSubject.next(this.list)
          })
    }

    setList(objs:Map<String,T>)
    {
      this.localStorageService.setData(this.localstorage_key,Array.from(objs.values()).map((obj:T)=>obj.toString()))
    }
  
  
    getList(): T[] {
      let r: T[] = [];
      this.listSubject.getValue().forEach((value: T) => r.push(value));
      return r;
    }
  
    setObject(obj: T) {
      this.list.set(obj.id.toString(),obj);
      this.setList(this.list);  
    }
    deleteObject(obj:T)
    {
        if(this.list.has(obj.id.toString())) this.list.delete(obj.id.toString())
        this.setList(this.list);
    }

    save(object:T,branch:String):Promise<ActionStatus<void>>
    {
        return new Promise<ActionStatus<void>>((resolve, reject) => {
            if (this.list.has(object.id.toString())) { return resolve(new ActionStatus()); }
            // console.log("User ",user.toString())
            this.firebaseApi.set(branch.toString(), object.toString())
            .then((result) => 
            {
                this.setObject(object);
                resolve(new ActionStatus());
            }).catch((error) => {
            this.firebaseApi.handleApiError(error);
            reject(error);
            });
        });
    }

    update(obj:T,branch): Promise<ActionStatus<T>> {
        return new Promise<ActionStatus<T>>((resolve, reject) => {
          this.firebaseApi.update(branch, obj.toString())
            .then((result: ActionStatus<T>) => {
                this.setObject(obj);
                resolve(result)
            })
            .catch((error: ActionStatus<T>) => {
              this.firebaseApi.handleApiError(error);
              reject(error);
            });
        });
    }
    delete(obj:T,branch): Promise<ActionStatus<T>> {
        return new Promise<ActionStatus<T>>((resolve, reject) => {
          this.firebaseApi.delete(branch)
            .then((result: ActionStatus<T>) => {
                this.deleteObject(obj)
                resolve(result)
            })
            .catch((error: ActionStatus<T>) => {
              this.firebaseApi.handleApiError(error);
              reject(error);
            });
        });
    }

    findByID(objID: EntityID,branch:String): Promise<ActionStatus<T>> {
        return new Promise<any>((resolve, reject) => {
            if (this.list.has(objID.toString())) {
            let result: ActionStatus<T> = new ActionStatus<T>();
            result.result = this.list.get(objID.toString());
            return resolve(result);
            }
            this.firebaseApi.fetchOnce(`${branch}/${objID.toString()}`)
            .then((value:ActionStatus<T>)=>{
                let instance:T= <T>new Entity();
                instance.hydrate(value.result.getData())
                this.setObject(instance);
                value.result=instance;
                resolve(value);
            })
            .catch((error:ActionStatus<T>)=>{
                reject(error);
            });
        });
    }

    findAll(branch:String):Promise<ActionStatus<T[]>>
    {
      return new Promise<ActionStatus<T>>((resolve,reject)=>{
        this.firebaseApi.fetchOnce(branch.toString())
        .then((result:ActionStatus<T>)=>{
          let data=result.result;
          for(let key in data)
          {
            let obj:T=<T> new Entity();
            obj.hydrate(data[key]);
            this.list.set(obj.id.toString(),obj);
          }
          this.setList(this.list)
          resolve(new ActionStatus())
        })
        .catch((error)=>reject(error))
      })
    }

    findByKey(key:String,value:String,branch):Promise<ActionStatus<T[]>>
    {
      return new Promise<ActionStatus<T[]>>((resolve,reject)=>{
        this.firebaseApi.getFirebaseDatabase()
        .ref(branch)
        .orderByChild(key)
        .equalTo(value)
        .once("value",(result)=>{
          let data=result.val();
          let objs:T[]=[];
          for(let key in data)
          {
            let inst:T=<T> new Entity();
            inst.hydrate(data[key])
            // this.listUser.set(key,user);
            objs.push(inst);
          }
          let actionResult=new ActionStatus();
          actionResult.result=objs;
          resolve(actionResult);
        })
      })
    }

    findObjectLocalByKey(key:String,value:String):T[]
    {
      return Array.from(this.listSubject.getValue().values())
        .filter((obj:T)=>obj[key.toString()]==value)
    }
  


}