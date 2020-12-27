import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  nav: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  line: {
    margin: "0 1rem",
  },
  // appBar: {
  //   marginBottom: "2rem",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: "0.8rem",
  // },
  heading: {
    color: "white",
    fontSize: "2.5rem",
    fontWeight: "normal",
  },
  image: {
    marginLeft: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
