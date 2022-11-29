import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const useStyle = makeStyles({

  div: {
    width: "30%",
    margin: "150px auto",
  },

});
function AddUser() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imagechange, setImageChange] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [textEmailState, setTextEmailHelper] = useState("");
  const [textFileState, setTextFileHelper] = useState("");
  const [textNameState, setTextNameHelper] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target);
  };
  const handleImage = (e) => {
    setImageChange(e.target.value);
    setIsLoading(true);
    const input = e.target.files[0];
    const data = new FormData();
    data.append("file", input);
    data.append("upload_preset", "sq5otdxh");
    data.append("cloud_name", "dvtyxoaak");
    console.log(data);

    fetch("https://api.cloudinary.com/v1_1/dvtyxoaak/image/upload", {
      method: "post",
      body: data,
    }).then((resp) => resp.json()).then((datas) => {
      setImageurl(datas.url);
      setIsLoading(false);
    }).catch((error) => { console.log(error); });
  };
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const backHandler = () => {
    navigate("/");
  };
  const addUserHandler = () => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (name === "") {
      setTextNameHelper("Please enter Name");
    } else {
      setTextNameHelper("");
    }
    if (email === "") {
      setTextEmailHelper("please Enter Email");
    } else {
      setTextEmailHelper("");
    }
    if (role === "") {
      console.log("please Enter Role");
    }
    if (imagechange === "") {
      setTextFileHelper("please upload image");
    } else {
      setTextFileHelper("");
    }
    if (!regex.test(email)) {
      setTextEmailHelper("email is not valid");
    } else {
      setTextEmailHelper("");
    }
    if (name !== "" && email !== "" && role !== "" && imageurl !== "" && regex.test(email)) {
      const newUser = {
        name,
        email,
        role,
        imageurl,
      };
      fetch("https://node-postgres-sample.herokuapp.com/users", {
        method: "Post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok === true) {
          // handleClickOpen();
          setName("");
          setEmail("");
          setRole("");
          setImageurl("");
          setImageChange("");
        }
      });
      backHandler();
    }
  };
  // setTextEmailHelper("Please enter email");

  const classes = useStyle();
  return (
    <div className={classes.div}>
      <TextField fullWidth label="Name" id="fullWidth" onChange={handleName} helperText={textNameState} value={name} />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" value={email} onChange={handleEmail} helperText={textEmailState} />
      <FormControl fullWidth sx={{ marginTop: "12px", border: "none" }}>
        <InputLabel>Role</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={role}
          label="Role"
          onChange={handleChange}
          helperText="hai"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="member">Member</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth type="file" sx={{ marginTop: "12px", border: "none" }} onChange={handleImage} helperText={textFileState} />
      {
        !isLoading ? (
          <img
            src={imageurl}
            alt="upload file"
            disabled={isLoading}
            style={{
              marginTop: "12px",
              width: "50%",
              height: "100px",
              borderRadius: "4px",
            }}
          />
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )
      }
      <div>
        <Button
          variant="contained"
          sx={{ margin: "12px" }}
          onClick={() => {
            addUserHandler();
          }}
        >
          Add Users
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "12px" }}
          onClick={() => {
            backHandler();
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
export default AddUser;
