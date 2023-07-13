import Content from "./Content";
import IssueItem from "../common/IssueItem";
import {
  useIssueDetail,
  useIssueDetailDispatch,
} from "../../contexts/issueDetailContext";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { IssueDetailBox } from "./IssueDetail.styles";

function IssueDetail() {
  const { data, error, loading } = useIssueDetail();
  const fetchIssueDetail = useIssueDetailDispatch();

  return (
    <IssueDetailBox>
      {data && (
        <IssueItem
          comments={data.comments}
          created_at={data.created_at}
          login={data.user.login}
          number={data.number}
          title={data.title}
          avatar_url={data.user.avatar_url}
        />
      )}
      <Content />
      <Loading loading={loading} />
      <Error error={error} refetch={fetchIssueDetail} />
    </IssueDetailBox>
  );
}

export default IssueDetail;
