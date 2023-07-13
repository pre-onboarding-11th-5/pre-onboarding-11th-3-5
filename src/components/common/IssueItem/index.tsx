import React from "react";
import type { Issue } from "../../../types/issue";
import {
  IssueItemAvatar,
  IssueItemBox,
  IssueItemLargeText,
  IssueItemLeftBox,
  IssueItemSmallText,
  IssueItemTextBox,
} from "./IssueItem.styles";

interface IssueItemProps
  extends Pick<Issue, "comments" | "created_at" | "number" | "title">,
    Pick<Issue["user"], "login">,
    Pick<Partial<Issue["user"]>, "avatar_url"> {}

const IssueItem: React.FC<IssueItemProps> = ({
  comments,
  created_at,
  login,
  number,
  title,
  avatar_url,
}) => {
  return (
    <IssueItemBox>
      <IssueItemLeftBox>
        {avatar_url && <IssueItemAvatar src={avatar_url} alt="avatar" />}
        <IssueItemTextBox>
          <IssueItemLargeText>
            #{number} {title}
          </IssueItemLargeText>
          <IssueItemSmallText>
            작성자: {login}, 작성일:{" "}
            {Intl.DateTimeFormat("ko-KR", { dateStyle: "long" }).format(
              new Date(created_at),
            )}
          </IssueItemSmallText>
        </IssueItemTextBox>
      </IssueItemLeftBox>
      <IssueItemSmallText>코멘트: {comments}</IssueItemSmallText>
    </IssueItemBox>
  );
};

export default React.memo(IssueItem);
