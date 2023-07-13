import type { IssueList } from "../types/issue";
import client from "./axiosInstance";

export const getIssueList = (page: number) =>
  client.get<IssueList>(`issues?page=${page}&sort=comments&state=open`);
