import React, { useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

import { Posts } from "./components/Posts/Posts";
import { Form } from "./components/Form/Form";

import useStyles from "./styles";

function App() {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState<string | null>(null);

  return (
    // <Container maxWidth={false}>
    <div>
      <nav className={classes.nav}>
        <Typography className={classes.heading} variant='h1' align='center'>
          Book Highlights
        </Typography>
        <hr className={classes.line} />
      </nav>
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.mainContainer}
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

      {/* </Container> */}
    </div>
  );
}

export default App;
