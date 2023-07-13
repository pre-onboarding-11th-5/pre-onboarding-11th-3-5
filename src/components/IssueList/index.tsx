import { useEffect, useRef, useState } from "react";
import { useIssues, useIssueDispatch } from "../../contexts/issueContext";
import IssueItem from "../common/IssueItem";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { styled } from "styled-components";

function IssueList() {
  const { data, loading, error } = useIssues();
  const { fetchIssues } = useIssueDispatch();
  const [page, setPage] = useState(1);

  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    fetchIssues(page);
  }, [fetchIssues, page]);

  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );
    observer.observe(target.current);
  }, [loading]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <IssueListWrapper>
      {data.map((issue) => (
        <IssueItem
          key={issue.id}
          number={issue.number}
          title={issue.title}
          author={issue.user.login}
          comments={issue.comments}
          created={issue.created_at}
        />
      ))}
      <div
        ref={target}
        style={{ height: "30px", border: "1px solid red" }}
      ></div>
    </IssueListWrapper>
  );
}

export default IssueList;

const IssueListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
