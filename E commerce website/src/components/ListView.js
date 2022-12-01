import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Paper } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import debounce from "lodash.debounce";
import ApiCall from "./ApiCall";

const useStyles = makeStyles({
  root: {
    minWidth: 650,
    margin: "25px auto",
    width: "80% !important",
    border: "1px solid black",
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    height: "75vh !important",

  },
  tableHead: {
    position: "sticky !important",
    backgroundColor: "white !important",
    zIndex: "2",
    top: "0vh",

  },
  paper: {
    p: "2px 4px",
    display: "flex",
    width: "30%",
    alignItems: "center",
    margin: "25px",
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
    minWidth: 650,
    margin: "25px auto",
    width: "80% !important",
    borderRadius: "4px",
    left: "50%",
    justifyContent: "space-between",
  },
  Box: {
    width: "20%",
    margin: "150px auto",
    marginLeft: "500px",
  },
});
function List() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [filtered, setFiltered] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpens(true);
  };
  const handleClickClose = () => {
    setOpens(false);
  };

  const reguestSucces = (list) => {
    setData(list);
    setIsLoading(false);
  };
  useEffect(() => {
    ApiCall("https://node-postgres-sample.herokuapp.com/users", "Get", reguestSucces);
  }, []);
  const classes = useStyles();
  const searchItem = (e) => {
    setIsLoading(true);
    const input = e.target.value;
    if (input !== "") {
      fetch(`https://node-postgres-sample.herokuapp.com/searchUsers/${input}`).then((resp) => resp.json()).then((item) => {
        setFiltered(item);
        setIsLoading(false);
      });
    } else {
      setFiltered(data);
    }
  };
  const debouncedResults = (e) => debounce(searchItem(e), 400);

  const handleChange = (e) => {
    setIsLoading(true);
    const input = e.target.value;
    if (input === "admin" || input === "member") {
      fetch(`https://node-postgres-sample.herokuapp.com/getUserByRole/${input}`).then((resp) => resp.json()).then((item) => {
        setFiltered(item);
        setIsLoading(false);
      });
    } else {
      // console.log();
      setFiltered(data);
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const addUser = () => {
    navigate("/adduser");
  };
  const buttonServer = (lent) => {
    navigate(`/edit/${lent.id}`);
  };
  const DeleteServer = (lent) => {
    console.log(lent);
    fetch(`https://node-postgres-sample.herokuapp.com/users/${lent.id}`, { method: "Delete" }).then((resp) => {
      if (resp.ok === true) {
        ApiCall("https://node-postgres-sample.herokuapp.com/users", "Get", reguestSucces);
      }
    });
    handleClose();
  };

  return (
    <>
      <div className={classes.div}>
        <Paper className={classes.paper}>
          <InputBase
            className={classes.input}
            placeholder="Search By name"
            inputProps={{ "aria-label": "search" }}
            onChange={debouncedResults}
          />
          <SearchIcon className={classes.sarch} />
        </Paper>
        <FormControl sx={{ width: "30%" }}>
          <InputLabel>Search By Role</InputLabel>
          <Select
            open={opens}
            onClose={handleClickClose}
            onOpen={handleOpen}
            // value={role}
            label="Search By Role"
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="clearall">Select all Option</MenuItem>
          </Select>
        </FormControl>
        <div style={{ paddingRight: "25px" }}>
          <Button variant="contained" onClick={addUser}> ADD USERS</Button>

        </div>
      </div>
      <TableContainer
        component={Paper}
        className={classes.root}
      >
        <Table
          aria-label="simple table"
        >
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Image</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading ? (
            <TableBody>
              {filtered ? (
                filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.role}</TableCell>
                    <TableCell align="center">
                      <Button><EditIcon onClick={() => buttonServer(item)} /></Button>
                      <Button>
                        <DeleteIcon onClick={handleClickOpen} />
                        <Dialog
                          open={open}
                          onClose={handleClose}
                        >
                          <DialogTitle id="alert-dialog-title">
                            Delete user
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure to DELETE the User
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => DeleteServer(item)}>
                              ok
                            </Button>
                          </DialogActions>
                        </Dialog>

                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={item.imageurl}
                        alt=""
                        style={{
                          marginTop: "12px",
                          width: "50%",
                          height: "100px",
                          borderRadius: "4px",
                        }}
                      />

                    </TableCell>

                  </TableRow>
                ))
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.role}</TableCell>
                    <TableCell align="center">
                      <Button><EditIcon onClick={() => buttonServer(item)} /></Button>
                      <Button>
                        <DeleteIcon onClick={handleClickOpen} />
                        <Dialog
                          open={open}
                          onClose={handleClose}
                        >
                          <DialogTitle id="alert-dialog-title">
                            Delete user
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure to DELETE the User
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => DeleteServer(item)}>
                              ok
                            </Button>
                          </DialogActions>
                        </Dialog>

                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={item.imageurl}
                        alt=""
                        style={{
                          marginTop: "12px",
                          width: "50%",
                          height: "100px",
                          borderRadius: "4px",
                        }}
                      />

                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          ) : (
            <Box className={classes.Box}>
              <CircularProgress />
            </Box>
          )}

        </Table>

      </TableContainer>
    </>
  );
}
export default List;
