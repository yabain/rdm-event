import { EntityID } from "../../entities/entityid";
import { DbBranch } from "../enum/db-branch.enum";

export function getBranchOfUsers():string
{
    return `${DbBranch.general_users}`
}

export function getBranchOfUser(userID:EntityID):string
{
    return `${getBranchOfUsers()}/${userID.toString()}`;
}

export function getBranchOfEvents():string
{
    return `${DbBranch.posts}`
}
export function getBranchOfFilActualites():string
{
    return `${DbBranch.fil_atualites}`
}
export function getBranchOfFilActualite(eventID:EntityID):string
{
    return `${getBranchOfFilActualites()}/${eventID.toString()}`
}

export function getBranchOfEvent(eventID:EntityID):string
{
    return `${getBranchOfEvents()}/${eventID.toString()}`
}

