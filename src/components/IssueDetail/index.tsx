import Content from "./Content";
import IssueItem from "../common/IssueItem";
import {
  useIssueDetail,
  useIssueDetailDispatch,
  useSetIssueDetail,
} from "../../contexts/issueDetailContext";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { IssueDetailBox } from "./IssueDetail.styles";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function IssueDetail() {
  const { data, error, loading } = useIssueDetail();
  const fetchIssueDetail = useIssueDetailDispatch();
  const { state } = useLocation();
  const setData = useSetIssueDetail();
  useEffect(() => {
    if (state) {
      setData(state);
    }
  }, [state]);
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
