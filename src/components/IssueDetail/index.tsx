import Content from "./Content";
import IssueItem from "../common/IssueItem";

import { getAnIssue } from "../../apis/IssueAPI";
import { useIssue, useIssueDispatch } from "../../contexts/issueContext";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

function IssueDetail() {
  const { id } = useParams();
  const issue = useIssue();
  const issueDispatch = useIssueDispatch();

  useEffect(() => {
    issueDispatch({ id: Number(id) });
  }, []);
  console.log(issue);
  return (
    <div>
      {issue?.data && (
        <>
          <IssueItem isAvatar issue={issue.data[0]} />
          <Content content={`${issue.data[0].body}`} />
        </>
      )}
    </div>
  );
}

export default IssueDetail;
