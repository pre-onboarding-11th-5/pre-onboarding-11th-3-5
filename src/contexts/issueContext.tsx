import { createContext, useCallback, useContext, useState } from "react";
import { Issue, IssueList } from "../types/issue";
import { getIssue, getIssueList } from "../apis/getIssueLists";

type IssuesState = {
  loading: boolean;
  data: IssueList | null;
  error: any;
};

type IssueState = {
  loading: boolean;
  data: Issue | null;
  error: any;
};

const IssuesStateContext = createContext<IssuesState>({
  loading: false,
  data: null,
  error: null,
});
const IssueStateContext = createContext<IssueState>({
  loading: false,
  data: null,
  error: null,
});

const IssueDispatchContext = createContext<React.SetStateAction<any>>(null);

export const useIssues = () => {
  const state = useContext(IssuesStateContext);
  if (!state) {
    throw new Error("Error");
  }
  return state;
};
export const useIssue = () => {
  const state = useContext(IssueStateContext);
  if (!state) {
    throw new Error("Error");
  }
  return state;
};
export const useIssueDispatch = () => {
  const dispatch = useContext(IssueDispatchContext);
  if (!dispatch) {
    throw new Error("Error");
  }
  return dispatch;
};

const IssueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [issues, setIssues] = useState<IssuesState>({
    loading: false,
    data: null,
    error: null,
  });
  const [issue, setIssue] = useState<IssueState>({
    loading: false,
    data: null,
    error: null,
  });

  const dispatchIssues = async (page: number) => {
    setIssues((prev) => ({ ...prev, loading: true }));
    try {
      const data = await getIssueList({ per_page: 10, page, sort: "comments" });
      setIssues((prev) => ({
        ...prev,
        loading: false,
        data: prev.data ? [...prev.data, ...data] : [...data],
      }));
    } catch (e) {
      setIssues((prev) => ({ ...prev, loading: false, error: e }));
    }
  };

  const dispatchIssue = async (id: number) => {
    setIssue((prev) => ({ ...prev, loading: true }));
    try {
      const data = await getIssue(id);
      setIssue((prev) => ({ ...prev, loading: false, data }));
    } catch (e) {
      setIssue((prev) => ({ ...prev, error: e }));
    }
  };
  const fetchIssues = useCallback((page: number) => dispatchIssues(page), []);
  const fetchIssue = useCallback((id: number) => dispatchIssue(id), []);

  return (
    <IssuesStateContext.Provider value={issues}>
      <IssueStateContext.Provider value={issue}>
        <IssueDispatchContext.Provider value={{ fetchIssues, fetchIssue }}>
          {children}
        </IssueDispatchContext.Provider>
      </IssueStateContext.Provider>
    </IssuesStateContext.Provider>
  );
};

export default IssueProvider;
