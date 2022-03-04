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
    override setFullName(fullname)
    {
        this.workGroupName=fullname
    }
    override toString(): Record<string | number, any> {
        return {
            ...super.toString(),
            workGroupName:this.workGroupName,
            userType:this.userType
        }
    }
}