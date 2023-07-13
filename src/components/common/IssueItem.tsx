import styled from "styled-components";

import type { Issue } from "../../types/issue";

import { Link } from "react-router-dom";

type IssueItemProps = {
  isAvatar: boolean;
  issue?: Issue;
};

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid gray;
  padding: 1rem 0;
  margin: 0.2rem auto;

  font-size: 1.05rem;
  font-weight: 500;

  a,
  a:visited,
  a:link {
    flex-basis: 60%;

    display: inline-flex;
    color: black;
    text-decoration-line: none;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    margin: 0.5rem;
  }

  img {
    width: 3rem;
    border-radius: 100%;
    margin: 0 1rem;
  }
`;

function IssueItem({ isAvatar = false, issue }: IssueItemProps) {
  const date = new Date(`${issue?.created_at}`);

  return (
    <ItemWrapper>
      <Link to={`${isAvatar ? "#" : issue?.number}`}>
        {isAvatar && <img src={`${issue?.user.avatar_url}`} alt="user" />}
        <div>
          <span>#{issue?.number}</span>
          <span>{issue?.title}</span>
          <br />
          <span>작성자: {issue?.user.login}</span>
          <span>
            작성일: {date.getFullYear()}년 {date.getMonth() + 1}월{" "}
            {date.getDay()}일
          </span>
        </div>
      </Link>

      <span>코멘트: {issue?.comments}</span>
    </ItemWrapper>
  );
}

export default IssueItem;
