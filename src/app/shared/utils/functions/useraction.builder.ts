import { UserAction } from "../../entities";
import { CommentAction, LiketAction, VoteAction } from "../../entities/useraction";
import { UserActionType } from "../../enum/useraction.enum";

export function UserActionBuilder(entity):UserAction
{
    switch(entity.actionType)
    {
        case UserActionType.COMMENT_ACTION:
            return new CommentAction()
        case UserActionType.LIKE_ACTION:
            return new LiketAction()
        case UserActionType.VOTE_ACTION:
            return new VoteAction()
    }
}