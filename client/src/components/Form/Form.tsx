import React, { FC, FormEvent, useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
//@ts-ignore (Could not find a file declaration file for module 'react-file-base64')
import FileBase from "react-file-base64";
import { PostFormData } from "../../utils/types/posts";
import { useMutation, useQueryClient } from "react-query";
import useStyles from "./styles";
import { createPost, updatePost } from "../../utils/api/api-client";
import { Post as IPost } from "../../utils/types/posts";

interface FormProps {
  currentId: string | null;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Form: FC<FormProps> = ({ currentId, setCurrentId }) => {
  const queryClient = useQueryClient();
  const classes = useStyles();
  const [postData, setPostData] = useState<PostFormData>({
    creator: "",
    title: "",
    message: "",
    tags: [""],
    selectedFile: "",
  });

  const previousPosts = queryClient.getQueryData<IPost[]>("posts");
  console.log("DATA", previousPosts);
  console.log(postData.creator);

  // const postToUpdate =
  //   currentId && previousPosts
  //     ? previousPosts.find((post) => post._id === currentId)
  //     : null;

  useEffect(() => {
    if (currentId && previousPosts) {
      const postToUpdate = previousPosts.find((post) => post._id === currentId);
      if (postToUpdate)
        setPostData({
          creator: postToUpdate.creator,
          title: postToUpdate.title,
          message: postToUpdate.message,
          tags: [...postToUpdate.tags],
          selectedFile: postToUpdate.selectedFile,
        });
    }
  }, [currentId, queryClient]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (currentId) {
      updatePostMutation.mutate({ id: currentId, postData: postData });
    } else {
      // @ts-ignore
      createPostMutation.mutate({ ...postData });
    }

    clear();
  };

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("posts");
    },
  });

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("posts");
    },
  });

  const clear = () => {
    setCurrentId("");
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [""],
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? "Edit a Memory" : "Create a Memory"}
        </Typography>
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
          multiline
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
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
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
