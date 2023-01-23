import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ApiCall from "./ApiCall";
// import { color } from "@mui/system";

/**
 *  useStyle function is used to make css style for material ui
 */
const useStyle = makeStyles({

  div: {
    width: "30%",
    margin: "120px auto",
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
function AddUser() {
  const [open, setOpen] = useState(false);
  const [openApi, setOpenApi] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imagechange, setImageChange] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [textEmailState, setTextEmailHelper] = useState("");
  const [textFileState, setTextFileHelper] = useState("");
  const [textNameState, setTextNameHelper] = useState("");
  const [textRoleState, setTextRoleHelper] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLoader, setIsApiLoader] = useState(false);
  const navigate = useNavigate();
  /**
   * handleName function is used to collect the state value for name input tag
   * @handleName {e}
   */
  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setTextNameHelper("please enter Name");
    } else {
      setTextNameHelper("");
    }
  };
  /**
   * handleEmail function is used to collect the state value for email input tag
   * @handleEmail {e}
   */
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setTextEmailHelper("please enter Email");
    } else {
      setTextEmailHelper("");
    }
  };
  /**
   * handleImage function is used to collect the state value for image input tag
   * And send api to cloudinary
   * @handleImage {e}
   */
  const handleImage = (e) => {
    setImageChange(e.target.value);
    if (e.target.value === "") {
      setTextFileHelper("please Select image");
    } else {
      setTextFileHelper("");
    }
    setIsLoading(true);
    const input = e.target.files[0];
    const data = new FormData();
    data.append("file", input);
    data.append("upload_preset", "sq5otdxh");
    data.append("cloud_name", "dvtyxoaak");

    fetch("https://api.cloudinary.com/v1_1/dvtyxoaak/image/upload", {
      method: "post",
      body: data,
    }).then((resp) => resp.json()).then((datas) => {
      setImageurl(datas.url);
      setIsLoading(false);
    });
  };
  /**
   * handleChange function is used to collect the state value for Role input tag
   * @handleChange {e}
   */
  const handleChange = (event) => {
    setRole(event.target.value);
    if (event.target.value === "") {
      setTextRoleHelper("please Select Role");
    } else {
      setTextRoleHelper("");
    }
  };
  /**
   * handleApiClose
   */

  const handleApiClose = () => {
    setOpenApi(false);
  };
  const handleApiClickOpen = () => {
    setOpenApi(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      setTextRoleHelper("please Enter Role");
    } else {
      setTextRoleHelper("");
    }
    if (imagechange === "") {
      // eslint-disable-next-line no-import-assign, no-undef
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
      ApiCall("/users", "Post", () => {
        setName("");
        setEmail("");
        setRole("");
        setImageurl("");
        setImageChange("");
        setIsApiLoader(false);
      }, JSON.stringify(newUser), {
        "Content-type": "application/json",
      });
      handleApiClickOpen();
    }
  };

  const classes = useStyle();
  return (
    <>
      <div className={classes.div}>
        <div className={classes.Header}>
          ADD USER DETAILS
        </div>
        <TextField className={classes.textField} fullWidth label="Name" id="fullWidth" onChange={handleName} helperText={textNameState} value={name} />
        <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} className={classes.textField} label="Email" value={email} onChange={handleEmail} helperText={textEmailState} />
        <FormControl fullWidth sx={{ marginTop: "12px", border: "none" }} className={classes.textField}>
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
          <FormHelperText>{textRoleState}</FormHelperText>
        </FormControl>
        <div className={classes.image}>
          <TextField type="file" className={classes.imagetextField} onChange={handleImage} helperText={textFileState} />
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
                  alt="upload profile"
                  src={imageurl}
                  disabled={isLoading}
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
              User has been added successfully
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
export default AddUser;
