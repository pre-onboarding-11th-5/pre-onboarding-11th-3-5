import { useEffect, useRef } from "react";
import { useIssueListDispatch } from "../contexts/issueContext";

const useInfiniteIssue = <T extends HTMLElement>() => {
  const fetchNextPage = useIssueListDispatch();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observeTargetRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            fetchNextPage();
          }
        });
      },
      { threshold: 0.5 },
    );

    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = observer;
    observeTargetRef.current &&
      observerRef.current.observe(observeTargetRef.current);
  }, [fetchNextPage]);

  return observeTargetRef;
};

export default useInfiniteIssue;
