import React, { useCallback } from "react";
import Posts from "../components/Posts/Posts";
import { useGetPostsQuery } from "../store/posts/posts.slice";
import { useState } from "react";

const PostsContainer = () => {
  const [page, setPage] = useState(1);
  const { data, isError, error, isLoading } = useGetPostsQuery(page);
  const handlePagination = useCallback(
    (type: "next" | "prev") => {
      setPage((state) => (type === "next" ? state + 1 : state - 1));
    },
    [setPage]
  );

  return (
    <Posts
      data={data?.results}
      info={data?.info}
      isError={isError}
      isLoading={isLoading}
      error={error as any}
      handlePagination={handlePagination}
      page={page}
    />
  );
};

export default PostsContainer;
