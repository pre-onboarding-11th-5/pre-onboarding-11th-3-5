import styled from "styled-components";

import IssueItem from "../common/IssueItem";
import Advertisement from "./Advertisement";
import { useIssue, useIssueDispatch } from "../../contexts/issueContext";

import { useEffect, useRef, useState } from "react";
import Loading from "../common/Loading";
import Error from "../common/Error";

const Ul = styled.ul`
  padding: 0 2rem;

  li:last-child {
    height: 300px;
  }
`;

function IssueList() {
  const issue = useIssue();
  const issueDispatch = useIssueDispatch();

  const viewRef = useRef<HTMLLIElement | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!viewRef?.current) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          issueDispatch({ page: page, page_number: 10 });
          setPage(page + 1);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(viewRef.current);

    return () => {
      observer.disconnect();
    };
  }, [issueDispatch, page]);

  if (issue?.error) {
    return <Error />;
  }

  return (
    <Ul>
      {issue?.loading && <Loading />}
      {issue?.data?.map((e, idx) => {
        if ((idx + 1) % 5 === 0) {
          return <Advertisement key={idx} />;
        }

        return <IssueItem key={e.id + idx} issue={e} isAvatar={false} />;
      })}
      <li ref={viewRef}></li>
    </Ul>
  );
}

export default IssueList;
