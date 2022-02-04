import { Entity } from "./entity";
import { EntityID } from "./entityid";


export class VoteCandidate extends Entity
{
    fullName:String="";
    birthDate:String="";
    images:String[]=[];
    idCategori:EntityID=new EntityID()    
}