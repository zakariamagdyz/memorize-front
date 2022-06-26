import { AxiosInstance } from "axios";

///  APIS & Axios

type TMethodProps = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type TAxiosMethods = "get" | "post" | "put" | "patch" | "delete";
type TConfigObj = {
  axiosInstance: AxiosInstance;
  method: TMethodProps;
  url: string;
  requestConfig: object;
};
