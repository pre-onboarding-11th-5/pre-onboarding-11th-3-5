import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

interface IssueItemProps {
  isAvatar?: string;
  number: number;
  title: string;
  author: string;
  comments: number;
  created: string;
}

function IssueItem({
  isAvatar,
  number,
  title,
  author,
  comments,
  created,
}: IssueItemProps) {
  const navigate = useNavigate();

  return (
    <>
      <IssueItemWapper onClick={() => navigate(`/${number}`)}>
        {isAvatar ? <Avatar src={isAvatar} alt={author} /> : null}
        <IssueInformation>
          <TitleWapper>
            <div>#{number}</div>
            <div>{title}</div>
          </TitleWapper>
          <CreateWapper>
            <div>작성자:{author}</div>
            <div>작성일:{created}</div>
          </CreateWapper>
        </IssueInformation>
        <IssueComments>
          <div>코멘트:{comments}</div>
        </IssueComments>
      </IssueItemWapper>
    </>
  );
}

export default IssueItem;

const IssueItemWapper = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
`;

const IssueInformation = styled.div``;

const TitleWapper = styled.div`
  display: flex;
`;

const CreateWapper = styled.div`
  display: flex;
`;

const IssueComments = styled.div``;
