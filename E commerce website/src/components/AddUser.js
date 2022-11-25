import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

const useStyle = makeStyles({

  div: {
    width: "30%",
    margin: "25px auto",
  },

});
function AddUser() {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [opened, setOpend] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageurl, setImageurl] = useState("");
  const navigate = useNavigate();
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target);
  };
  // const handleRole = (e) => {
  //   setRole(e.target.value);
  // };
  const handleImage = (e) => {
    let input = e.target.files[0];
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
    }).catch((error) => { console.log(error); });
    input = "";
  };
  // console.log(url);
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickOpen = () => {
    setOpens(true);
  };
  const handleClickOpend = () => {
    setOpend(true);
  };

  const handleCloses = () => {
    setOpens(false);
  };
  const handleClosesd = () => {
    setOpend(false);
  };
  const addUserHandler = () => {
    console.log(imageurl);
    // eslint-disable-next-line no-useless-escape
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email)) {
      const newUser = {
        name,
        email,
        role,
        imageurl,
      };

      if (name !== "" && email !== "" && role !== "" && imageurl !== "") {
        fetch("https://node-postgres-sample.herokuapp.com/users", {
          method: "Post",
          body: JSON.stringify(newUser),
          headers: {
            "Content-type": "application/json",
          },
        }).then((resp) => {
          if (resp.ok === true) {
            handleClickOpen();
            setName("");
            setEmail("");
            setRole("");
            setImageurl("");
          }
        });
      } else {
        alert("please add the data");
      }
    } else {
      handleClickOpend();
    }
  };

  const backHandler = () => {
    navigate("/");
  };
  const classes = useStyle();
  return (
    <div className={classes.div}>
      <TextField fullWidth label="Name" id="fullWidth" onChange={handleName} value={name} />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" value={email} onChange={handleEmail} />
      <FormControl fullWidth sx={{ marginTop: "12px", border: "none" }}>
        <InputLabel>Role</InputLabel>
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
      <TextField fullWidth type="file" sx={{ marginTop: "12px", border: "none" }} onChange={handleImage} />
      <img
        src={imageurl}
        alt="upload file"
        style={{
          marginTop: "12px",
          width: "50%",
          height: "100px",
          borderRadius: "4px",
        }}
      />
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
      <Dialog
        sx={{
          display: "flex", alignItems: "center", left: "40%",
        }}
        open={opens}
        onClose={handleCloses}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{
          display: "flex",
          alignItems: "center",
        }}
        >
          <CheckCircleRoundedIcon fontSize="large" color="secondary" />
          <DialogContentText id="alert-dialog-description">
            User Details Upadated sucessfully
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        sx={{
          display: "flex", alignItems: "center", left: "40%",
        }}
        open={opened}
        onClose={handleClosesd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{
          display: "flex",
          alignItems: "center",
        }}
        >
          <ErrorOutlineRoundedIcon fontSize="large" color="success" />
          <DialogContentText id="alert-dialog-description">
            please provide correct Details
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddUser;
