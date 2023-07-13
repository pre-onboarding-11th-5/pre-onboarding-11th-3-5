import { ForwardedRef, ReactNode, forwardRef } from "react";
import { styled } from "styled-components";
import { Issue } from "../../types/issue";

interface IssueItemProps {
  isAvatar?: boolean;
  issue?: Issue;
  onClick?: () => void;
}

const StyledCard = styled.div`
  width: 100%;
  height: 130px;
  padding: 1rem;

  border-bottom: 1px solid #333;
`;

export function IssueItemCard({
  children,
}: {
  children?: JSX.Element | ReactNode;
}) {
  return <StyledCard>{children}</StyledCard>;
}

const dateTimeFormatKR = new Intl.DateTimeFormat("ko", { dateStyle: "long" });

const IssueItem = forwardRef(
  (
    { isAvatar = false, issue, onClick }: IssueItemProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const createdAt = new Date(issue?.created_at ?? "2015-01-01");
    return (
      <IssueItemBox onClick={onClick} ref={ref}>
        {isAvatar && (
          <UserImageBox>
            {issue && (
              <UserImage
                src={issue.user.avatar_url}
                width={75}
                height={75}
                alt="issuer_image"
              />
            )}
          </UserImageBox>
        )}
        <IssueItemCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p>
                #{issue?.number} {issue?.title}
              </p>
              <p>
                작성자:
                {issue?.user.login}
                작성일: {dateTimeFormatKR.format(createdAt)}
              </p>
            </div>
            <span>
              코멘트:
              {issue?.comments}
            </span>
          </div>
        </IssueItemCard>
      </IssueItemBox>
    );
  },
);

export default IssueItem;

const IssueItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
`;

const UserImageBox = styled.div`
  position: relative;
  width: 75px;
  padding-bottom: 75px;
  background-color: #ddd;
`;

const UserImage = styled.img`
  position: absolute;
`;
