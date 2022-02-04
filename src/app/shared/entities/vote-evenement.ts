import { Entity, Evenement } from ".";
import { EventType } from "../enum";
import { UserActionType } from "../enum/useraction.enum";
import { UserActionBuilder } from "../utils/functions";
import { VoteCandidate } from "./votecandidate";

export class VoteEvenement extends Evenement
{
    candidates:VoteCandidate[]=[];
    override eventType:EventType=EventType.VOTE_EVENT
    
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
            if(key=="candidates") this.candidates=entity[key].map((candidate)=>{
                let can=new VoteCandidate();
                can.hydrate(candidate);
                return can;
            });
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }
    getVoteNumber()
    {
        return this.getActionByType(UserActionType.VOTE_ACTION).length
    }

    override getSpecialActionNumber()
    {
        return this.getVoteNumber()
    }
    override toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            if(k=="candidates") r[k]=this.candidates.map((candidate)=>candidate.toString());
            if(k=="actions") r[k]=this.actions.map((action)=>action.toString());
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}