import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 5,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.8rem",
  },
  heading: {
    color: "black",
    fontSize: "2.5rem",
    fontWeight: "normal",
  },
  image: {
    marginLeft: "15px",
  },
}));
