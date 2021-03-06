import { UserActionType } from "../enum/useraction.enum";
import { UserActionBuilder, UtilTime } from "../utils/functions";
import { weekStringList } from "../utils/functions/time";
import { EventScopeAction, EventState, EventType, UserAction } from "./../enum";
import { Entity } from "./entity";
import { EntityID } from "./entityid";
import { CategorieEvenement } from "./vote-evenement";

export class Evenement extends Entity
{
    
    
    name:String="";
    place:String=""
    state:EventState=EventState.UNPUBLISHED;
    isStarted:boolean=false;
    startDateTime:number=0;
    endDateTime:number=0;
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

    isPublishedEvent()
    {
        return this.state==EventState.PUBLISHED;
    }

    getStringTypeEvenement():String
    {
        switch(this.eventType)
        {
            case EventType.VOTE_EVENT:
                return "Ellections"
        }
        return ""
    }
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
    getStringIntervalEventDate()
    {
        return UtilTime.getStringIntervalDateFromString(this.startDate,this.startTime,this.endDate,this.endTime)
    }
    getStringEventDate()
    {
        if(this.startDate=="") return "Chargement de données..."

        if(this.state==EventState.PUBLISHED)
        {
            let pd=new Date(this.datePublication);
            return `Publié ${weekStringList[pd.getDay()]} ${UtilTime.getDateNumberFromDate(pd)} ${UtilTime.getMonthStringByNumber(pd.getMonth())} à ${UtilTime.getTimeFromDate(pd)}`
        }
        
        let cd = new Date(this.createdDate.toString())
        return `Créer ${weekStringList[cd.getDay()]} ${UtilTime.getDateNumberFromDate(cd)} ${UtilTime.getMonthStringByNumber(cd.getMonth())} à ${UtilTime.getTimeFromDate(cd)}`
    }
    getActionByOwner(userAction: UserActionType, idOwner: EntityID) {
        return this.actions.find((action)=>action.idOwnerAction.toString()==idOwner.toString() && action.actionType==userAction);
    }
    getPosActionByOwner(userAction: UserActionType, idOwner: EntityID) {
        return this.actions.findIndex((action)=>action.idOwnerAction.toString()==idOwner.toString() && action.actionType==userAction);
      }
    getCommentNumber()
    {
        return this.getActionByType(UserActionType.COMMENT_ACTION).length
    }
    getLikeNumber()
    {
        return this.getActionByType(UserActionType.LIKE_ACTION).length
    }

    getSpecialActionNumber()
    {
        return 0;
    }

    getSpecialActionByOwner(idOwner:EntityID):UserAction
    {
        return null;
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
            else if(key=="eventOwner") this.eventOwner.setId(entity[key]);
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
    //     let r={};
    //     for(const k of Object.keys(this))
    //     {
    //         if(k=="id") r[k]=this.id.toString();
    //         else if(k=="eventOwner") r[k]=this.eventOwner.toString();
    //         else if(k=="actions") r[k]=this.actions.map((action)=>action.toString());
    //         else r[k]=Reflect.get(this,k);
    //     }
    //     return r;
    // }
        return {
            ...super.toString(),
            name:this.name,
            place:this.place,
            state:this.state,
            isStarted:this.isStarted,
            startDateTime:this.startDateTime,
            endDateTime:this.endDateTime,
            startDate:this.startDate,
            startTime:this.startTime,
            endTime:this.endTime,
            eventOwner:this.eventOwner.toString(),
            endDate:this.endDate,
            description:this.description,
            urlBanner:this.urlBanner,
            createdDate:this.createdDate,
            scopeVisibilityAction:this.scopeVisibilityAction,
            selectedGroupVisibilityAction:this.selectedGroupVisibilityAction,
            eventType:this.eventType,
            actions:this.actions.map((action)=>action.toString())
        }
    }
}



