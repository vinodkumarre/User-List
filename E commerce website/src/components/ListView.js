import React, { useEffect } from "react";
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

const useStyles = makeStyles({
  root: {
    minWidth: 650,
    margin: "25px auto",
    width: "80% !important",
    border: "1px solid black",

  },
  tableHead: {
    position: "sticky",
    top: "20px",
    border: "2px solid black",

  },
});
function List() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [data] = ApiCall(" https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  const list = JSON.parse(localStorage.getItem("data"));
  console.log(list);
  const buttonServer = (lent) => {
    console.log(lent);
    navigate("/edit");
  };
  const DeleteServer = (lent) => {
    console.log(lent.id);
  };
  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.root}
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
        <TableBody>
          {list && list.map((item) => (
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
