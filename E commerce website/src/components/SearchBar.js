import React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  paper: {
    p: "2px 4px",
    position: "sticky",
    top: "0vh",
    display: "flex",
    width: "60%",
    alignItems: "center",
    margin: "25px auto",
    boxShadow: "none",
    border: "1px solid",

  },
  input: {
    ml: 1,
    flex: 1,
    margin: "9px auto",

  },

});
function SearchBar() {
  const classes = useStyle();
  return (
    <Paper className={classes.paper}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
      <SearchIcon />
    </Paper>
  );
}
export default SearchBar;
