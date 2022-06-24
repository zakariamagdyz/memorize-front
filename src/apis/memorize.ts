import axios from "axios";

const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : process.env.REACT_APP_API_URL;

export const publicCall = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-US",
  },
});

export const privateCall = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-US",
  },
});
