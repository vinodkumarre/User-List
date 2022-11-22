import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
// import ApiCall from "./ApiCall";

const useStyle = makeStyles({

  div: {
    margin: "30%",
    marginTop: "0%",
    marginBottom: "0%",
  },

});
function AddUser() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  const addUserHandler = () => {
    const newUser = {
      name,
      email,
      role,
      image: file,
    };
    fetch("https://node-postgres-sample.herokuapp.com/users", {
      method: "Post",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    }).then((resp) => {
      if (resp.ok === true) {
        alert("data added");
      }
    });
  };
  const handleImage = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const [open, setOpen] = useState(false);

  const classes = useStyle();
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.div}>
      <TextField fullWidth label="Name" id="fullWidth" onChange={handleName} />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" onChange={handleEmail} />
      <FormControl fullWidth sx={{ marginTop: "12px", border: "none" }}>
        <InputLabel onChange={handleRole}>Role</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={role}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth type="file" sx={{ marginTop: "12px", border: "none" }} onChange={handleImage} />
      <img
        src={file}
        alt=""
        style={{
          marginTop: "12px",
          width: "100%",
          height: "100%",
          borderRadius: "4px",
        }}
      />
      <Button
        variant="contained"
        sx={{ margin: "12px" }}
        onClick={() => {
          addUserHandler();
        }}
      >
        Add Users
      </Button>
    </div>
  );
}
export default AddUser;
