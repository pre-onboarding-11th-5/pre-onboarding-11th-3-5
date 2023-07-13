import { styled } from "styled-components";
import { useIssue, useIssueDispatch } from "../../contexts/issueContext";
import IssueItem from "../common/IssueItem";
import Advertisement from "./Advertisement";
import Loading from "../common/Loading";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../common/Error";

const ListUl = styled.ul`
  border: 1px solid red;
  padding: 1rem;
`;

function IssueList() {
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement & HTMLImageElement>(null);
  const { data, loading, error, page } = useIssue();

  const dispatchIssue = useIssueDispatch();

  useEffect(() => {
    if (bottomRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(
          (entry) => {
            if (entry.isIntersecting && !loading) {
              console.log("refetch");
              dispatchIssue({ data, loading, error, page });
            }
          },
          { threshold: 1 },
        );
      });
      observer.observe(bottomRef.current);
    }
  }, [data, loading, error, bottomRef, dispatchIssue, page]);

  const renderData = useCallback(() => {
    if (!page || data === null) return;

    const items: JSX.Element[] = [];

    if (loading) {
      Array(page * 15)
        .fill(1)
        .forEach((_, i) => {
          items.push(<Loading key={i + Math.random() * Math.random()} />);
          if ((i + 1) % 4 === 0)
            items.push(<Advertisement key={i * Math.random()} />);
        });
    } else {
      data?.forEach((issue, index) => {
        items.push(
          index + 1 === data.length ? (
            <IssueItem
              ref={bottomRef}
              key={issue?.id}
              issue={issue}
              onClick={() => navigate(`/${issue.number}`)}
            />
          ) : (
            <IssueItem
              key={issue?.id}
              issue={issue}
              onClick={() => navigate(`/${issue.number}`)}
            />
          ),
        );
        if ((index + 1) % 4 === 0)
          items.push(
            index + 1 === data.length * page ? (
              <Advertisement ref={bottomRef} key={issue?.id + index} />
            ) : (
              <Advertisement key={index} />
            ),
          );
      });
    }

    return items;
  }, [data, loading, page, navigate])();

  return <ListUl>{error ? <Error /> : renderData}</ListUl>;
}

export default IssueList;
