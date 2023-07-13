import client from "./axiosInstance";

interface getIssueListParam {
  per_page: number;
  page: number;
  sort: string;
}

export const getIssueList = async ({
  per_page,
  page,
  sort,
}: getIssueListParam) => {
  const { data } = await client(
    `/issues?per_page=${per_page}&page=${page}&sort=${sort}`,
  );
  return data;
};

export const getIssue = async (id: number) => {
  const { data } = await client(`/issues/${id}`);
  return data;
};
