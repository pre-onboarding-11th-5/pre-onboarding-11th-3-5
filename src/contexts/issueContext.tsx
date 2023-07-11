import { createContext, useContext, useState } from "react";
import { Issue } from "../types/issue";

type IssueState = {
  data: Issue | null;
  loading: boolean;
  error: any;
};

const IssueStateContext = createContext<IssueState | null>(null);
const IssueDispatchContext = createContext<React.Dispatch<
  React.SetStateAction<IssueState>
> | null>(null);

export const useIssue = () => useContext(IssueStateContext);
export const useIssueDispatch = () => useContext(IssueDispatchContext);

const IssueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<IssueState>({
    data: null,
    loading: true,
    error: null,
  });

  const dispatchIssue = async () => {
    // fetch data
  };
  return (
    <IssueStateContext.Provider value={data}>
      <IssueDispatchContext.Provider value={dispatchIssue}>
        {children}
      </IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
};

export default IssueProvider;
