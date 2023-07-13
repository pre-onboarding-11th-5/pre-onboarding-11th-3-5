import type { Issue } from "../types/issue";
import client from "./axiosInstance";

export const getIssue = (id: number) => client.get<Issue>(`issues/${id}`);
