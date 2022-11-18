import React from "react";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";

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
    paddingLeft: "15px",

  },
  sarch: {
    paddingRight: "15px",
  },
  div: {
    display: "flex",
    alignItems: "center",
    width: "60%",
    margin: "25px auto",
  },

});
function SearchBar() {
  const navigate = useNavigate();
  const classes = useStyle();
  const addUser = () => {
    navigate("/adduser");
  };
  return (
    <div className={classes.div}>
      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
        <SearchIcon className={classes.sarch} />
      </Paper>
      <Button variant="contained" onClick={addUser}> ADD USERS</Button>
    </div>
  );
}
export default SearchBar;
