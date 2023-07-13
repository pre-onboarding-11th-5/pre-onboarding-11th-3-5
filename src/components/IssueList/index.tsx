import {
  useIssueList,
  useIssueListDispatch,
} from "../../contexts/issueContext";
import IssueItem from "../common/IssueItem";
import Advertisement from "./Advertisement";
import useInfiniteIssue from "../../hooks/useInfiniteIssue";
import { Link } from "react-router-dom";
import { IssueListBox } from "./IssueList.styles";
import Loading from "../common/Loading";
import Error from "../common/Error";

function IssueList() {
  const { data, error, loading, hasNextPage } = useIssueList();
  const fetchNextPage = useIssueListDispatch();
  const observeTargetRef = useInfiniteIssue<HTMLDivElement>();

  return (
    <IssueListBox>
      {data.flatMap((issue, index) => {
        const nodes = [
          <li key={issue.number}>
            <Link to={`/${issue.number}`} state={issue}>
              <IssueItem
                comments={issue.comments}
                number={issue.number}
                title={issue.title}
                created_at={issue.created_at}
                login={issue.user.login}
              />
            </Link>
          </li>,
        ];
        const isAdvertisement = (index + 1) % 4 === 0;
        isAdvertisement &&
          nodes.push(
            <li key={`ad#${index}`}>
              <Advertisement />
            </li>,
          );
        return nodes;
      })}
      <div ref={hasNextPage && !error ? observeTargetRef : null}></div>
      <Error error={error} refetch={fetchNextPage} />
      <Loading loading={loading} />
    </IssueListBox>
  );
}

export default IssueList;
