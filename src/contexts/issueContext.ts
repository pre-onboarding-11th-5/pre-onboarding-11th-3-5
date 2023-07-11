import { createContext, useContext } from "react";

const IssueStateContext = createContext(null);
const IssueDispatchContext = createContext(null);

export const useIssue = () => useContext(IssueStateContext);

function IssueProvider({ children }) {
  const [data, setData] = useState({ data, loading, error });

  const dispatchIssue = async () => {
    /**
     try {
      const response = await getIssueList();
     } catch (e) {

     }
     */
  };
  return (
    <IssueStateContext.Provider value={data}>
      <IssueDispatchContext.Provider value={dispatchIssue}>
        {children}
      </IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
}
