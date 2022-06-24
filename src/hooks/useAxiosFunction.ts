import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { TAxiosMethods, TConfigObj } from "../types/types";

const useAxiosFunction = <Response = {}>() => {
  const [response, setResponse] = useState<Response[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [controller, setController] = useState<AbortController>();

  const axiosFetch = async (configObj: TConfigObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase() as TAxiosMethods](
        url,
        {
          ...requestConfig,
          signal: ctrl.signal,
        }
      );
      console.log(res);
      setResponse(res.data);
    } catch (err) {
      if (err instanceof AxiosError || err instanceof Error) {
        console.log(err.message);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(controller);

    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
