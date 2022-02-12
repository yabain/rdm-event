import { UserType } from "../enum";
import { User } from "./user";

export class BusinessUser extends User
{
    workGroupName:String="";
    override userType:UserType=UserType.BUSINESS_USER

    override getPrintableName()
    {
        return this.workGroupName
    }
    override getFullName()
    {
        return this.workGroupName
    }
}