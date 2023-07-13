import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IssueList } from "../types/issue";
import { getIssueList } from "../apis/getIssueList";

type IssueState = {
  data: IssueList | null;
  loading: boolean;
  error: any;
  page?: number;
};

const IssueStateContext = createContext<IssueState | null>(null);
const IssueDispatchContext = createContext<React.Dispatch<
  React.SetStateAction<IssueState>
> | null>(null);

export const useIssue = () => {
  const state = useContext(IssueStateContext);
  if (!state) throw new Error("Cannot find issueProvider");
  return state;
};
export const useIssueDispatch = () => {
  const state = useContext(IssueDispatchContext);
  if (!state) throw new Error("Cannot find issueProvider");
  return state;
};

const IssueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<IssueState>({
    data: null,
    loading: true,
    error: null,
  });

  const [page, setPage] = useState(1);

  const dispatchIssue = useCallback(async () => {
    setData((prev) => {
      return { ...prev, loading: true };
    });
    const controller = new AbortController();
    const { signal } = controller;
    try {
      const newData = await getIssueList(page, { signal });

      setData((prev) => {
        return {
          ...prev,
          data: prev.data ? [...prev.data, ...newData] : [...newData],
        };
      });
    } catch (error) {
      setData((prev) => {
        return { ...prev, error: true };
      });
    } finally {
      setData((prev) => {
        return { ...prev, loading: false };
      });
    }

    controller.abort();
    setPage((prev) => prev + 1);
  }, [page]);

  useEffect(() => {
    dispatchIssue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IssueStateContext.Provider value={{ ...data, page }}>
      <IssueDispatchContext.Provider value={dispatchIssue}>
        {children}
      </IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
};

export default IssueProvider;
