import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Paper } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ApiCall from "./ApiCall";
// import EditPage from "./Edit";

const useStyles = makeStyles({
  root: {
    minWidth: 650,
    margin: "25px auto",
    width: "80% !important",
    border: "1px solid black",
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    height: "80vh !important",

  },
  tableHead: {
    position: "sticky !important",
    backgroundColor: "white !important",
    zIndex: "2",
    top: "0vh",

  },
});
function List() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [data] = ApiCall("https://node-postgres-sample.herokuapp.com/users");
  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);
  // const list = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  const buttonServer = (lent) => {
    console.log(lent.id);
    navigate(`/edit/${lent.id}`);
  };
  const DeleteServer = (lent) => {
    console.log(lent);
  };
  return (
    <TableContainer
      component={Paper}
      className={classes.root}
    >
      <Table
        aria-label="simple table"
      >
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell align="center" padding="checkbox"><Checkbox /></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tbody}>
          {data && data.map((item) => (
            <TableRow key={item.id}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.email}</TableCell>
              <TableCell align="center">{item.role}</TableCell>
              <TableCell align="center">
                <Button onClick={() => buttonServer(item)}><EditIcon /></Button>
                <Button onClick={() => DeleteServer(item)}><DeleteIcon /></Button>
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>

    </TableContainer>

  );
}
export default List;
