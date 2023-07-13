import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Issue } from "../types/issue";
import { useLocation, useParams } from "react-router-dom";
import { getIssue } from "../apis/getIssue";
import { isAxiosError } from "axios";
import type { ErrorResponse } from "../types/error";

type IssueDetailState = {
  data: Issue | null;
  loading: boolean;
  error: {
    message: string;
  } | null;
};

const IssueDetailStateContext = createContext<IssueDetailState | null>(null);
const IssueDetailDispatchContext = createContext<(() => Promise<void>) | null>(
  null,
);

export const useIssueDetail = () => {
  const issueDetailState = useContext(IssueDetailStateContext);
  if (!issueDetailState) throw new Error("Cannot find IssueProvider");
  return issueDetailState;
};
export const useIssueDetailDispatch = () => {
  const issueDetailDispatch = useContext(IssueDetailDispatchContext);
  if (!issueDetailDispatch) throw new Error("Cannot find IssueProvider");
  return issueDetailDispatch;
};

const IssueDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { state: issue } = useLocation();
  const [data, setData] = useState<IssueDetailState>({
    data: issue,
    loading: true,
    error: null,
  });
  const { id } = useParams();

  const fetchIssueDetail = useCallback(async () => {
    if (!id || isNaN(parseInt(id))) {
      setData((prev) => ({ ...prev, error: { message: "Invalid id" } }));
      return;
    }
    try {
      setData((prev) => ({ ...prev, loading: true, error: null }));
      const { data } = await getIssue(parseInt(id));
      setData((prev) => ({ ...prev, data }));
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
  }, [id]);

  useEffect(() => {
    if (!data.data) fetchIssueDetail();
  }, [fetchIssueDetail, data.data]);

  return (
    <IssueDetailStateContext.Provider value={data}>
      <IssueDetailDispatchContext.Provider value={fetchIssueDetail}>
        {children}
      </IssueDetailDispatchContext.Provider>
    </IssueDetailStateContext.Provider>
  );
};

export default IssueDetailProvider;
