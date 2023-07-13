import { createContext, useContext, useEffect, useState } from "react";
import type { IssueList } from "../types/issue";
import { getIssueList } from "../apis/getIssueList";
import { isAxiosError } from "axios";
import type { ErrorResponse } from "../types/error";

type IssueState = {
  data: IssueList;
  loading: boolean;
  error: {
    message: string;
  } | null;
  currentPage: number;
  hasNextPage: boolean;
};

const IssueListStateContext = createContext<IssueState | null>(null);
const IssueListDispatchContext = createContext<(() => void) | null>(null);

export const useIssueList = () => {
  const issueState = useContext(IssueListStateContext);
  if (!issueState) throw new Error("Cannot find IssueProvider");
  return issueState;
};
export const useIssueListDispatch = () => {
  const issueDispatch = useContext(IssueListDispatchContext);
  if (!issueDispatch) throw new Error("Cannot find IssueProvider");
  return issueDispatch;
};

const IssueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<IssueList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [pageState, setPageState] = useState<{
    currentPage: number;
    hasNextPage: boolean;
  }>({
    currentPage: 1,
    hasNextPage: true,
  });

  const dispatchIssueList = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await getIssueList(page);

      setData((prev) => {
        if (pageState.currentPage === page) return prev;
        return [...prev, ...data];
      });
      setPageState({ currentPage: page, hasNextPage: data.length === 30 });
    } catch (e) {
      if (isAxiosError<ErrorResponse>(e) && e.response) {
        const {
          data: { message },
        } = e.response;
        setError({ message });
      } else if (isAxiosError(e)) {
        const { message } = e;
        setError({ message });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = () => {
    if (loading || !pageState.hasNextPage) return;
    dispatchIssueList(pageState.currentPage + 1);
  };

  useEffect(() => {
    dispatchIssueList(1);
  }, []);

  return (
    <IssueListStateContext.Provider
      value={{ data, loading, error, ...pageState }}
    >
      <IssueListDispatchContext.Provider value={fetchNextPage}>
        {children}
      </IssueListDispatchContext.Provider>
    </IssueListStateContext.Provider>
  );
};

export default IssueProvider;
