import { UserActionBuilder } from "../utils/functions";
import { EventScopeAction, EventState, EventType, UserAction } from "./../enum";
import { Entity } from "./entity";
import { EntityID } from "./entityid";

export class Evenement extends Entity
{
    name:String="";
    state:EventState=EventState.UNPUBLISHED;
    startDate:String="";
    endDate:String=""
    description:String="";
    urlBanner:String=""
    scopeVisibilityAction:EventScopeAction=EventScopeAction.FOR_NONE;
    selectedGroupVisibilityAction:String="";
    eventType:EventType=EventType.VOTE_EVENT;
    actions:UserAction[]=[];

    override hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            if(key=="actions") this.actions=entity[key].map((action)=>{
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
            if(k=="actions") r[k]=this.actions.map((action)=>action.toString());
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}