import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
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
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [opened, setOpend] = React.useState(false);

  // const [inputRole, setInputRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [imageurl, setImageUrl] = React.useState("");
  const navigate = useNavigate();

  const reguestSucces = (lists) => {
    const list = lists.find((item) => item.id === +prams.id);
    console.log(list);
    if (list) {
      setRole(list.role);
      setName(list.name);
      setEmail(list.email);
      setImageUrl(list.imageurl);
    }
  };

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
  const handleClickOpen = () => {
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
  };
  const handleClickOpend = () => {
    setOpend(true);
  };
  const handleClosesd = () => {
    setOpend(false);
  };

  const handleImage = (e) => {
    const imageDate = new FormData();
    imageDate.append("file", e.target.files[0]);
    imageDate.append("upload_preset", "sq5otdxh");
    imageDate.append("cloud_name", "dvtyxoaak");
    fetch("https://api.cloudinary.com/v1_1/dvtyxoaak/image/upload", {
      method: "post",
      body: imageDate,
    }).then((resp) => resp.json()).then((datas) => {
      setImageUrl(datas.url);
    }).catch((error) => { console.log(error); });
  };

  const editHandler = () => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email)) {
      const newUser = {
        name,
        email,
        role,
        imageurl,
      };
      console.log(newUser);
      if (name !== "" && email !== "" && role !== "" && imageurl !== "") {
        fetch(`https://node-postgres-sample.herokuapp.com/users/${prams.id}`, {
          method: "Put",
          body: JSON.stringify(newUser),
          headers: {
            "Content-type": "application/json",
          },
        }).then((resp) => {
          if (resp.ok === true) {
            handleClickOpen();
            setRole("");
            setName("");
            setEmail("");
            setImageUrl("");
          }
        });
      }
    } else { handleClickOpend(); }
  };

  const backHandler = () => {
    navigate("/");
  };
  return (
    <div className={classes.div}>
      <TextField fullWidth label="Name" id="fullWidth" value={name} onChange={handleName} />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" value={email} onChange={handleEmail} />
      <FormControl fullWidth sx={{ marginTop: "12px", border: "none" }}>
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
      </FormControl>
      <TextField fullWidth type="file" sx={{ marginTop: "12px", border: "none" }} onChange={handleImage} />
      <img
        src={imageurl}
        alt=""
        style={{

          marginTop: "12px",
          width: "50%",
          height: "100px",
          borderRadius: "4px",

        }}
      />
      <div>
        <Button variant="contained" sx={{ margin: "12px" }} onClick={editHandler}>
          Edit
        </Button>
        <Button variant="contained" sx={{ margin: "12px" }} onClick={backHandler}>
          Back
        </Button>
      </div>
      <Dialog
        sx={{
          display: "flex",
          alignItems: "center",
          left: "40%",
        }}
        open={opens}
        onClose={handleCloses}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <CheckCircleRoundedIcon fontSize="large" color="secondary" />

          <DialogContentText id="alert-dialog-description">
            User Details Edited sucessfully
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
export default EditPage;
