import React, { useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.png";
import { Posts } from "./components/Posts/Posts";
import { Form } from "./components/Form/Form";
import useStyles from "./styles";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

function App() {
  const classes = useStyles();
  const queryClient = new QueryClient();
  const [currentId, setCurrentId] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth='lg'>
        <AppBar className={classes.appBar} position='static' color='inherit'>
          <Typography className={classes.heading} variant='h2' align='center'>
            Book Highlights
          </Typography>
          {/* <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='60'
        /> */}
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justify='space-between'
              alignItems='stretch'
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
