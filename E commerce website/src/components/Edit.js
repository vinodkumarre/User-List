import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ApiCall from "./ApiCall";

const useStyle = makeStyles({
  div: {
    width: "30%",
    margin: "150px auto",
  },
  Header: {
    display: "flex",
    justifyContent: "center",
    margin: "25px auto",
    fontSize: "25px",
    backgroundColor: "rgba(0, 200, 146, 0.5)",
    paddingLeft: "25px",
    paddingRight: "25px",
  },
  textField: {
    "& p": {
      color: "red",
    },

  },
  Box: {
    position: "absolute",
    left: "30%",
    top: "35%",
    zIndex: "1000",
    height: "30%",
    width: "30%",
    "& span": {
      display: "flex",
      justifyContent: "center",
      width: "30% !important",
      height: "30% !important",
      margin: "auto",

    },
  },
  imagetextField: {
    width: "60% !important",
    "& div": {
      height: "70px",

    },

  },
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px auto",
  },

});
function EditPage() {
  const prams = useParams();
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const [openApi, setOpenApi] = useState(false);
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [imageurl, setImageUrl] = React.useState("");
  const [textEmailState, setTextEmailHelper] = useState("");
  const [textFileState, setTextFileHelper] = useState("");
  const [textNameState, setTextNameHelper] = useState("");
  const [textRoleState, setTextRoleHelper] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLoader, setIsApiLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const reguestSucces = (lists) => {
      const list = lists.find((item) => item.id === +prams.id);
      if (list) {
        setRole(list.role);
        setName(list.name);
        setEmail(list.email);
        setImageUrl(list.imageurl);
      }
    };
    ApiCall("https://node-postgres-sample.herokuapp.com/users", "Get", reguestSucces);
  }, [prams.id]);

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
    if (e.target.value === "") {
      setTextNameHelper("Please Enter Name");
    } else {
      setTextNameHelper("");
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setTextEmailHelper("Please Enter Email");
    } else {
      setTextEmailHelper("");
    }
  };
  const handleApiClose = () => {
    setOpenApi(false);
  };
  const handleApiClickOpen = () => {
    setOpenApi(true);
  };

  const handleImage = (e) => {
    setIsLoading(true);
    if (e.target.value === "") {
      setTextFileHelper("Please Select image");
    } else {
      setTextFileHelper("");
    }
    const imageDate = new FormData();
    imageDate.append("file", e.target.files[0]);
    imageDate.append("upload_preset", "sq5otdxh");
    imageDate.append("cloud_name", "dvtyxoaak");
    fetch("https://api.cloudinary.com/v1_1/dvtyxoaak/image/upload", {
      method: "post",
      body: imageDate,
    }).then((resp) => resp.json()).then((datas) => {
      setImageUrl(datas.url);
      setIsLoading(false);
    });
  };
  const backHandler = () => {
    navigate("/");
  };

  const editHandler = () => {
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
      setTextRoleHelper("please Enter Role");
    } else {
      setTextRoleHelper("");
    }
    if (imageurl === "") {
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
      setIsApiLoader(true);
      const newUser = {
        name,
        email,
        role,
        imageurl,
      };
      fetch(`https://node-postgres-sample.herokuapp.com/users/${prams.id}`, {
        method: "Put",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok === true) {
          setIsApiLoader(false);
        }
      });
      handleApiClickOpen();
    }
  };
  return (
    <>
      <div className={classes.div}>
        <div className={classes.Header}>
          EDIT USER DETAILS
        </div>
        <TextField className={classes.textField} fullWidth label="Name" id="fullWidth" value={name} onChange={handleName} helperText={textNameState} />
        <TextField className={classes.textField} fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" value={email} onChange={handleEmail} helperText={textEmailState} />
        <FormControl className={classes.textField} fullWidth sx={{ marginTop: "12px", border: "none" }}>
          <InputLabel />
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={role}
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="member">Member</MenuItem>
          </Select>
          <FormHelperText>{textRoleState}</FormHelperText>
        </FormControl>
        <div className={classes.image}>
          <TextField className={classes.imagetextField} fullWidth type="file" sx={{ marginTop: "12px", border: "none" }} onChange={handleImage} helperText={textFileState} />
          <div style={{
            width: "30%",
            height: "100px",
            borderRadius: "4px",
            border: "2px solid black",
          }}
          >

            {
              !isLoading ? (
                <img
                  src={imageurl}
                  alt=""
                  style={{

                    width: "100%",
                    height: "100px",

                  }}
                />

              ) : (
                <Box sx={{
                  display: "flex",
                  margin: "25px auto",
                  left: "30%",
                  top: "35%",
                  zIndex: "1000",
                  height: "30%",
                  width: "30%",
                }}
                >
                  <CircularProgress />
                </Box>
              )
            }
          </div>
        </div>

        <div>
          <Button variant="contained" sx={{ margin: "12px" }} onClick={editHandler}>
            Edit
          </Button>
          <Button variant="contained" sx={{ margin: "12px" }} onClick={backHandler}>
            Back
          </Button>
        </div>
      </div>
      {!isApiLoader ? (
        <Dialog
          open={openApi}
          disabled={isApiLoader}
          onClose={handleApiClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              User details have been updated
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : (
        <Box className={classes.Box}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
export default EditPage;
