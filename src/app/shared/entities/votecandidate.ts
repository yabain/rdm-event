import { UserActionType } from "../enum/useraction.enum";
import { UserActionBuilder } from "../utils/functions";
import { Entity } from "./entity";
import { EntityID } from "./entityid";
import { CommentAction, LiketAction, UserAction } from "./useraction";


export class VoteCandidate extends Entity
{
    fullName:String="";
    description:String=""
    birthDate:String="";
    images:String[]=[];
    idCategori:EntityID=new EntityID()    
    num:Number=0;
    metier:String=""
    actions:UserAction[]=[];
    getCommentNumber()
    {
        return this.getActionByType(UserActionType.COMMENT_ACTION).length
    }
    getLikeNumber()
    {
        return this.getActionByType(UserActionType.LIKE_ACTION).length
    }
    getShareNumber()
    {
        return 0;
    }

    getSpecialActionNumber()
    {
        return 0;
    }
    getCommmentList():CommentAction[]
    {
        return <CommentAction[]>this.getActionByType(UserActionType.COMMENT_ACTION)
    }

    getActionByType(type:UserActionType):UserAction[]
    {
        return this.actions.filter((userAction)=>userAction.actionType==type)
    }
    override hydrate(entity: Record<string | number,any>):void
    {
        
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="idCategori") this.idCategori.setId(entity[key]);
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
        // let r={};
        // for(const k of Object.keys(this))
        // {
        //     if(k=="id") r[k]=this.id.toString();
        //     if(k=="idCategori") r[k]=this.idCategori.toString();
        //     else if(k=="actions") r[k]=this.actions.map((action)=>action.toString());
        //     else r[k]=Reflect.get(this,k);
        // }
        // return r;
        return {
            ...super.toString(),
            fullName:this.fullName,
            description:this.description,
            birthDate:this.birthDate,
            images:this.images,
            idCategori:this.idCategori.toString(),    
            num:this.num,
            metier:this.metier,
            actions:this.actions.map((action)=>action.toString())
        }
    }
}