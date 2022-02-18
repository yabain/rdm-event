import { Entity } from "./entity";
import { EntityID } from "./entityid";


export class VoteCandidate extends Entity
{
    fullName:String="";
    description:String=""
    birthDate:String="";
    images:String[]=[];
    idCategori:EntityID=new EntityID()    
    num:Number=0;
    metier:String=""

    override hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            if(key=="idCategori") this.idCategori.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    override toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            if(k=="idCategori") r[k]=this.idCategori.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}