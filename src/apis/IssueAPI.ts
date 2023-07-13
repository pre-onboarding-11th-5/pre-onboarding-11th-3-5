import client, { baseURL } from "./axiosInstance";
import { isAxiosError } from "axios";
import type { Issue } from "../types/issue";

export const getIssueList = async (
  page: number,
  per_page: number,
): Promise<Issue[]> => {
  try {
    const response = await client.get(
      `${baseURL}?page=${page}&per_page=${per_page}&state=open&sort=comments`,
      {},
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e)) {
      console.log(e.message);
    }
    throw e;
  }
};

export const getAnIssue = async (issueNumber: number): Promise<Issue[]> => {
  try {
    const response = await client.get(`${baseURL}/${issueNumber}`, {});
    return [response.data];
  } catch (e) {
    if (isAxiosError(e)) {
      console.log(e.message);
    }
    throw e;
  }
};
