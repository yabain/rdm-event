import { Entity, EntityID, Evenement } from ".";
import { EventType } from "../enum";
import { UserActionType } from "../enum/useraction.enum";
import { UserActionBuilder } from "../utils/functions";
import { VoteAction } from "./useraction";
import { VoteCandidate } from "./votecandidate";

export class VoteEvenement extends Evenement
{
    override eventType:EventType=EventType.VOTE_EVENT
    categories:CategorieEvenement[]=[]
    candidates:VoteCandidate[]=[];

    constructor()
    {
        super();
        // let defaultCathegories= new CategorieEvenement()
        // defaultCathegories.nom="Defaut"
        // defaultCathegories.description="Catégorie par défaut";
        // defaultCathegories.evendID.setId(this.id.toString())
        // this.categories.push(defaultCathegories)
    }

    getCandidatesByCategories(categorieID:EntityID):VoteCandidate[]
    {
        return this.candidates.filter((candidate)=>candidate.idCategori.toString()==categorieID.toString())
    }
    override hydrate(entity: Record<string | number,any>):void
    {
        for(let key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(key=="actions") this.actions=entity[key].map((action)=>{
                let act = UserActionBuilder(action)
                act.hydrate(action)
                return act
            })
            else if(key=="categories") this.categories=entity[key].map((cat)=>{
                let cathegorie = new CategorieEvenement()
                cathegorie.hydrate(cat)
                return cathegorie
            })
            else if(key=="candidates") this.candidates=entity[key].map((candidate)=>{
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
    getVoteByCategorie(categorieID:EntityID)
    {
        return (<VoteAction[]>this.getActionByType(UserActionType.VOTE_ACTION))
        .find((vote)=>vote.idCategorieCategorieSelected.toString()==categorieID.toString())
    }
    getVoteByCategorieVoterAndCandidate(categorieID:EntityID,voterID:EntityID,candidateID:EntityID)
    {
        return (<VoteAction[]>this.getActionByType(UserActionType.VOTE_ACTION))
        .find((vote)=>vote.idOwnerAction.toString()==voterID.toString() && 
                vote.idCategorieCategorieSelected.toString()==categorieID.toString() && 
                vote.idCandidateSelected.toString()==candidateID.toString()
            )
    }

    getVoteByCategorieAndVoter(categorieID:EntityID,voterID:EntityID)
    {
        return (<VoteAction[]>this.getActionByType(UserActionType.VOTE_ACTION))
            .find((vote)=>vote.idOwnerAction.toString()==voterID.toString() && vote.idCategorieCategorieSelected.toString()==categorieID.toString())
    }

    getCandidateByID(candidateID:EntityID)
    {
        return this.candidates.find((candidat)=>candidat.id.toString()==candidateID.toString())
    }

    getVoteActionByOwner(idOwner:EntityID):VoteAction
    {
        return (<VoteAction[]>this.getActionByType(UserActionType.VOTE_ACTION)).find((vote)=>vote.idOwnerAction.toString()==idOwner.toString())
    }
    override getSpecialActionNumber()
    {
        return this.getVoteNumber()
    }
    override toString():Record<string | number,any>
    {
        // let r={};
        // for(const k of Object.keys(this))
        // {
        //     if(k=="id") r[k]=this.id.toString();
        //     if(k=="candidates") r[k]=this.candidates.map((candidate)=>candidate.toString());
        //     if(k=="categories") r[k]=this.categories.map((categorie)=>categorie.toString());
        //     if(k=="actions") r[k]=this.actions.map((action)=>action.toString());
        //     else r[k]=Reflect.get(this,k);
        // }
        // return r;
        return {
            ...super.toString(),
            categories:this.categories.map((categorie)=>categorie.toString()),
            candidates:this.candidates.map((candidate)=>candidate.toString()),
        }
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
            else if(key=="evendID") this.evendID.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    override toString():Record<string | number,any>
    {
        // let r={};
        // for(const k of Object.keys(this))
        // {
        //     if(k=="id") r[k]=this.id.toString();
        //     if(k=="evendID") r[k]=this.id.toString();
        //     else r[k]=Reflect.get(this,k);
        // }
        // return r;
        return {
            ...super.toString(),
            nom:this.nom,
            description:this.description,
            eventID:this.evendID.toString()
        }
    }
}