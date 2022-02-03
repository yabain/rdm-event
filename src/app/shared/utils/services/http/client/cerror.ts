
import { Entity } from "src/app/shared/entities/entity";
import { CRequest } from "./crequest";
import { CResponse } from "./cresponse";

export class CError extends Entity
{
    
    request:CRequest=new CRequest();
    response:CResponse=new CResponse();
    message:String="";

    
    override toString() 
    {
        return {
           
        }
    }

   
    override hydrate(entity: Entity): void {
        throw new Error("Method not implemented.");
    }
}
