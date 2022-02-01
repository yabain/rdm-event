import { EntityID } from "./entityid";
import { UserActionType } from "../enum/useraction.enum";
import { Entity } from "./entity";

export class UserAction extends Entity
{
    date:String="";
    actionType:UserActionType=UserActionType.COMMENT_ACTION
    idOwnerAction:EntityID=new EntityID()
    override hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="idOwnerAction") this.idOwnerAction.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    override toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            if(k=="idOwnerAction") r[k]=this.idOwnerAction.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}


export class VoteAction extends UserAction
{
    override actionType: UserActionType=UserActionType.VOTE_ACTION;
    idCandidateSelected:EntityID=new EntityID()
    override hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="idOwnerAction") this.idOwnerAction.setId(entity[key]);
            else if(key=="idCandidateSelected") this.idCandidateSelected.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    override toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            if(k=="idOwnerAction") r[k]=this.idOwnerAction.toString();
            if(k=="idCandidateSelected") r[k]=this.idCandidateSelected.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}

export class CommentAction extends UserAction
{
    override actionType: UserActionType=UserActionType.COMMENT_ACTION;
    content:String=""
}

export class LiketAction extends UserAction
{
    override actionType: UserActionType=UserActionType.LIKE_ACTION;
}