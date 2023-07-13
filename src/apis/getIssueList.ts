import client from "./axiosInstance";

export const getIssueList = async (page: number, options = {}) => {
  const response = await client.get(
    `/issues?per_page=15&sort=comments&page=${page}`,
    options,
  );

  return response.data;
};

export const getAnIssue = async (number: number) => {
  const response = await client.get(`/issues/${number}`);
  return response.data;
};
