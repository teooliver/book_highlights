import React, { FC, FormEvent, useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
//@ts-ignore (Could not find a file declaration file for module 'react-file-base64')
import FileBase from "react-file-base64";
import { PostFormData } from "../../utils/types/posts";
import { useMutation, useQueryClient } from "react-query";
import useStyles from "./styles";
import { API_URL } from "../../utils/api/api-client";
import { Post as IPost } from "../../utils/types/posts";

interface FormProps {
  currentId: string | null;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface UpdatePostData {
  id: string;
  postData: PostFormData;
}

export const Form: FC<FormProps> = ({ currentId, setCurrentId }) => {
  const queryClient = useQueryClient();
  const classes = useStyles();
  const [postData, setPostData] = useState<PostFormData>({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (currentId) {
      const data = queryClient.getQueryData("posts");
      console.log("DATA", data);
      if (data) {
        // @ts-ignore
        const postToUpdate = data.find((post) => post._id === currentId);
        console.log("POST TO UPDATE", postToUpdate);
      }
    }
  }, [currentId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (currentId) {
      updatePostMutation.mutate({ id: currentId, postData: postData });
    }

    // @ts-ignore
    createPostMutation.mutate({ ...postData });
  };

  const createPost = async (newPostData: PostFormData) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostData),
    }).then((res) => res.json());

    return res as IPost[];
  };

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("posts");
    },
  });

  const updatePost = async (post: UpdatePostData) => {
    const res = await fetch(`${API_URL}/${post.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post.postData),
    }).then((res) => res.json());

    return res as IPost;
  };

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      // Invalidate and refetch

      queryClient.invalidateQueries("posts");
    },
  });

  const clear = () => {};
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>Create a Memory</Typography>
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }: { base64: string }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
