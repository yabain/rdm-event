import { UserActionBuilder } from "../utils/functions";
import { EventScopeAction, EventState, EventType, UserAction } from "./../enum";
import { Entity } from "./entity";
import { EntityID } from "./entityid";

export class Evenement extends Entity
{
    name:String="";
    place:String=""
    state:EventState=EventState.UNPUBLISHED;
    startDate:String="";
    startTime:String="";
    endTime:String="";
    eventOwner:EntityID=new EntityID()
    endDate:String=""
    description:String="";
    urlBanner:String=""
    createdDate:String=new Date().toISOString()
    scopeVisibilityAction:EventScopeAction=EventScopeAction.PERSONNAL;
    selectedGroupVisibilityAction:String="";
    eventType:EventType=EventType.VOTE_EVENT;
    actions:UserAction[]=[];
    datePublication:number=0


    override hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            if(key=="eventOwner") this.eventOwner.setId(entity[key]);
            else if(key=="actions") this.actions=entity[key].map((action)=>{
                let act = UserActionBuilder(action)
                act.hydrate(action)
                return act
            })
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    override toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            else if(k=="eventOwner") r[k]=this.eventOwner.toString();
            else if(k=="actions") r[k]=this.actions.map((action)=>action.toString());
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}