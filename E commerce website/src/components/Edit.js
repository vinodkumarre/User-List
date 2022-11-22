import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import ApiCall from "./ApiCall";
// import ApiCall from "./ApiCall";

const useStyle = makeStyles({
  div: {
    margin: "30%",
    marginTop: "0%",
    marginBottom: "0%",
  },

});
function EditPage() {
  const prams = useParams();
  const classes = useStyle();
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  // const navigate = useNavigate();
  const [data, setDate] = React.useState([]);
  const reguestSucces = (lists) => {
    setDate(lists);
    const list = lists.find((item) => item.id === +prams.id);
    if (list) {
      setRole(list.role);
      setName(list.name);
      setEmail(list.email);
    }
    console.log(list);
  };
  console.log(name);
  console.log(email);
  console.log(role);
  const [open, setOpen] = React.useState(false);

  console.log(data);

  useEffect(() => {
    ApiCall("https://node-postgres-sample.herokuapp.com/users", "Get", reguestSucces);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleRoles = (e) => {
    setRole(e.target.value);
  };
  const editHandler = (list) => {
    const newUser = {
      name,
      email,
      role,
    };
    console.log(newUser);
    fetch(`https://node-postgres-sample.herokuapp.com/users/${list.id}`, {
      method: "Put",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    }).then((resp) => {
      if (resp.ok === true) {
        alert("data is edited");
      }
    });
  };
  return (
    <div className={classes.div}>
      <TextField fullWidth label="Name" id="fullWidth" value={name} onChange={handleName} />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" value={email} onChange={handleEmail} />
      <FormControl fullWidth sx={{ marginTop: "12px", border: "none" }} value={role}>
        <InputLabel onChange={handleRoles}>Role</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={role}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="member">Member</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ margin: "12px" }} onClick={editHandler}>
        Edit
      </Button>
    </div>
  );
}
export default EditPage;
