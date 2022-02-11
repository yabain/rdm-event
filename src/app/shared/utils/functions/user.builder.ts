import { User } from "../../entities";
import { BusinessUser } from "../../entities/business-user";
import { UserType } from "../../enum";

export function userBuilder(entity:Record<string,any>):User
{
    let user:User;
    switch(entity["userType"])
    {
        case UserType.NORMAL_USER:
            user=new User();
            break
        case UserType.BUSINESS_USER:
            user=new BusinessUser()
            break
    }
    user.hydrate(entity);
    return user
 }