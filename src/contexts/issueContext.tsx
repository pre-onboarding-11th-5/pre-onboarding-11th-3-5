import { createContext, useContext, useState } from "react";
import type { IssueList, Issue } from "../types/issue";

import { getIssueList, getAnIssue } from "../apis/IssueAPI";

import { isAxiosError } from "axios";

export type IssueState = {
  data: IssueList;
  loading: boolean;
  error: any;
};

type IssueProviderProps = {
  children: React.ReactNode;
};

const IssueStateContext = createContext<IssueState | null>(null);
const IssueDispatchContext = createContext<any | null>(null);

/**
 * React.Dispatch<React.SetStateAction<IssueState>>
 */
export const useIssue = () => useContext(IssueStateContext);
export const useIssueDispatch = () => useContext(IssueDispatchContext);

const IssueProvider = ({ children }: IssueProviderProps) => {
  const [data, setData] = useState<IssueState>({
    data: [],
    loading: false,
    error: null,
  });

  type dispatchIssueParams = {
    page?: number;
    page_number?: number;
    id?: number;
  };

  const dispatchIssue = async ({
    page,
    page_number,
    id,
  }: dispatchIssueParams) => {
    try {
      setData((prev) => ({ ...prev, loading: true }));
      if (page && page_number) {
        const issueList = await getIssueList(page, page_number);
        setData((prev) => ({
          ...prev,
          data: page > 1 ? [...data.data, ...issueList] : issueList,
          loading: false,
        }));
        return;
      }

      if (id) {
        const issueList = await getAnIssue(id);
        setData((prev) => ({
          ...prev,
          data: issueList,
          loading: false,
        }));
        return;
      }
    } catch (e) {
      if (isAxiosError(e)) {
        setData({ data: [], loading: false, error: e.message });
      }
    }
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
