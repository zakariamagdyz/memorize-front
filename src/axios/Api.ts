import axios from "axios";

const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : process.env.REACT_APP_API_URL;

const Call = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Call;
