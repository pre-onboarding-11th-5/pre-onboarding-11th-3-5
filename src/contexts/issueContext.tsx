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
  const [data, setData] = useState<IssueState>({
    data: [],
    loading: true,
    error: null,
    currentPage: 0,
    hasNextPage: true,
  });

  const dispatchIssueList = async (page: number) => {
    try {
      setData((prev) => ({ ...prev, loading: true, error: null }));

      const { data } = await getIssueList(page);

      setData((prev) => {
        if (prev.currentPage === page) return prev;
        return {
          ...prev,
          data: [...prev.data, ...data],
          currentPage: page,
          hasNextPage: data.length === 30,
        };
      });
    } catch (e) {
      if (isAxiosError<ErrorResponse>(e) && e.response) {
        const {
          data: { message },
        } = e.response;
        setData((prev) => ({
          ...prev,
          error: { message },
        }));
      } else if (isAxiosError(e)) {
        const { message } = e;
        setData((prev) => ({
          ...prev,
          error: { message },
        }));
      }
    } finally {
      setData((prev) => ({ ...prev, loading: false }));
    }
  };

  const fetchNextPage = () => {
    if (data.loading || !data.hasNextPage) return;
    dispatchIssueList(data.currentPage + 1);
  };

  useEffect(() => {
    dispatchIssueList(1);
  }, []);

  return (
    <IssueListStateContext.Provider value={data}>
      <IssueListDispatchContext.Provider value={fetchNextPage}>
        {children}
      </IssueListDispatchContext.Provider>
    </IssueListStateContext.Provider>
  );
};

export default IssueProvider;
