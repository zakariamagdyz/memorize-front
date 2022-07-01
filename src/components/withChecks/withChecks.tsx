import { Alert } from "@mui/material";
import React from "react";
import Loading from "../Loading/Loading";

type WrappedComponentProps<T extends object> = {
  isError: boolean;
  isLoading: boolean;
  data: T[] | T | undefined;
  error: any;
};

const withChecks =
  (WrappdComponent: React.ElementType) =>
  <T extends object>({
    isError,
    error,
    data,
    isLoading,
    ...props
  }: WrappedComponentProps<T> & Record<string, any>) => {
    if (isLoading) {
      return <Loading />;
    }
    if (isError) {
      return (
        <Alert variant="filled" severity="error">
          {error?.data?.message
            ? error.data.message
            : "Something wrong happened :("}
        </Alert>
      );
    }

    return Array.isArray(data) && data.length < 1 ? (
      <div>No Documents Found</div>
    ) : (
      <WrappdComponent data={data} {...props} />
    );
  };

export default withChecks;
