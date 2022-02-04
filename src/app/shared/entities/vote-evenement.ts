import { Entity, EntityID, Evenement } from ".";
import { EventType } from "../enum";
import { UserActionType } from "../enum/useraction.enum";
import { UserActionBuilder } from "../utils/functions";
import { VoteCandidate } from "./votecandidate";

export class VoteEvenement extends Evenement
{
    override eventType:EventType=EventType.VOTE_EVENT
    categories:CategorieEvenement[]=[]
    candidates:VoteCandidate[]=[];


    constructor()
    {
        super();
        let defaultCathegories= new CategorieEvenement()
        defaultCathegories.nom="Defaut"
        defaultCathegories.description="Catégorie par défaut";
        defaultCathegories.evendID.setId(this.id.toString())
        this.categories.push(defaultCathegories)
    }

        
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
            if(key=="categories") this.categories=entity[key].map((cat)=>{
                let cathegorie = new CategorieEvenement()
                cathegorie.hydrate(cat)
                return cathegorie
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
            if(k=="categories") r[k]=this.categories.map((categorie)=>categorie.toString());
            if(k=="actions") r[k]=this.actions.map((action)=>action.toString());
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}

export class CategorieEvenement extends Entity
{
    nom:String=""
    description:String=""
    evendID:EntityID=new EntityID()
    override hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            if(key=="evendID") this.id.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    override toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            if(k=="evendID") r[k]=this.id.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}