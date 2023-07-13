import Content from "./Content";
import { useIssue, useIssueDispatch } from "../../contexts/issueContext";
import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import Loading from "../common/Loading";
import Error from "../common/Error";
import IssueItem from "../common/IssueItem";

function IssueDetail() {
  const { id } = useParams();
  const { fetchIssue } = useIssueDispatch();
  const state = useIssue();

  useEffect(() => {
    if (id) {
      fetchIssue(parseInt(id));
    }
  }, [fetchIssue, id]);

  const { data, loading, error } = state;

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <div>
      <IssueItem
        isAvatar={data.user.avatar_url}
        number={data.number}
        title={data.title}
        author={data.user.login}
        comments={data.comments}
        created={data.created_at}
      />
      <Content content={data.body} />
    </div>
  );
}

export default IssueDetail;
