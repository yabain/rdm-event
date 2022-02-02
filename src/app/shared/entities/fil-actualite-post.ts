import { EntityID } from ".";
import { Entity } from "./entity";

export class FilActualitePost extends Entity
{
    datePublication:number=0;
    idEvent:EntityID=new EntityID()

    override hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            if(key=="idEvent") this.idEvent.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    override toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if(k=="id") r[k]=this.id.toString();
            if(k=="idEvent") r[k]=this.idEvent.toString();
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}