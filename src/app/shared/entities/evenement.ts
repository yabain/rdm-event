import { UserActionType } from "../enum/useraction.enum";
import { UserActionBuilder, UtilTime } from "../utils/functions";
import { weekStringList } from "../utils/functions/time";
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

    getStringScopeVisibility():String
    {
        switch(this.scopeVisibilityAction)
        {
            case EventScopeAction.PERSONNAL:
                return "Évènement personnel" 
            case EventScopeAction.PUBLIC:
                return "Évènement publique" 
            case EventScopeAction.PRIVATE:
                return "Évènement privé" 
        }
        return ""
    }
    getStringEventDate()
    {
        if(this.startDate=="") return "Chargement de données..."
        let d = UtilTime.getDateFromString(this.createdDate)
        let cd = new Date(this.createdDate.toString())
        return `${weekStringList[d.getDay()]} ${UtilTime.getDateNumberFromDate(d)} ${UtilTime.getMonthStringByNumber(d.getMonth())} à ${UtilTime.getTimeFromDate(cd)}`
    }
    getCommentNumber()
    {
        this.getActionByType(UserActionType.COMMENT_ACTION).length
    }
    getLikeNumber()
    {
        this.getActionByType(UserActionType.LIKE_ACTION).length
    }

    getActionByType(type:UserActionType)
    {
        return this.actions.filter((userAction)=>userAction.actionType==type)
    }

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