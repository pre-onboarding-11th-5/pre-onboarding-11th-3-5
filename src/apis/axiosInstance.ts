import axios from "axios";

export const baseURL = `https://api.github.com/repos/facebook/react/issues`;

const client = axios.create({
  headers: {
    Accept: "application/vnd.github+json",
    "X-Github-Api-Version": "2022-11-28",
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  },
});

export default client;
