import axios from "axios";

const ORGANIZATION = "facebook";
const REPO = "react";
const baseURL = `https://api.github.com/repos/${ORGANIZATION}/${REPO}`;

const client = axios.create({
  baseURL,
  headers: {
    Accept: "application/vnd.github+json",
    "X-Github-Api-Version": "2022-11-28",
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  },
});

export default client;
