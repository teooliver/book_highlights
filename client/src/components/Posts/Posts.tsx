import { CircularProgress, Grid } from "@material-ui/core";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../../utils/api/api-client";
import { Post as IPost } from "../../utils/types/posts";
import Post from "./Post/Post";
import useStyles from "./styles";

interface PostsProps {
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Posts: FC<PostsProps> = ({ setCurrentId }) => {
  const classes = useStyles();

  const fetchPosts = async () => {
    const res = await fetch(API_URL).then((res) => res.json());
    return res as IPost[];
  };

  const { data: posts, status } = useQuery("posts", fetchPosts);

  return (
    <>
      {status === "loading" && <CircularProgress />}

      {status === "success" && (
        <Grid
          className={classes.mainContainer}
          container
          alignItems='stretch'
          spacing={3}
        >
          {posts!.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
