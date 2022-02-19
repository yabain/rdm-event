import { EntityID } from './entityid';

export  class Entity
{
    public id:EntityID=new EntityID();
    hydrate(entity: Record<string | number,any>):void
    {
        console.log("entity ientr")
        for(const key of Object.keys(entity))
        {
            if(key=="id") this.id.setId(entity[key]);
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    toString():Record<string | number,any>
    {
        // let r={};
        // for(const k of Object.keys(this))
        // {
        //     if(k=="id") r[k]=this.id.toString();
        //     else r[k]=Reflect.get(this,k);
        // }
        // return r;
        return {
            id:this.id.toString()
        }
    }
}