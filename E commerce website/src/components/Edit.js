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
import ApiCall from "./ApiCall";

const useStyle = makeStyles({
  div: {
    width: "30%",
    margin: "150px auto",
  },

});
function EditPage() {
  const prams = useParams();
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [imageurl, setImageUrl] = React.useState("");
  const [textEmailState, setTextEmailHelper] = useState("");
  const [textFileState, setTextFileHelper] = useState("");
  const [textNameState, setTextNameHelper] = useState("");
  const [textRoleState, setTextRoleHelper] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  });

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

  const handleImage = (e) => {
    setIsLoading(true);
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
    }).catch((error) => { console.log(error); });
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
          setRole("");
          setName("");
          setEmail("");
          setImageUrl("");
        }
      });
      backHandler();
    }
  };
  return (
    <div className={classes.div}>
      <TextField fullWidth label="Name" id="fullWidth" value={name} onChange={handleName} helperText={textNameState} />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" value={email} onChange={handleEmail} helperText={textEmailState} />
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
        <FormHelperText>{textRoleState}</FormHelperText>
      </FormControl>
      <TextField fullWidth type="file" sx={{ marginTop: "12px", border: "none" }} onChange={handleImage} helperText={textFileState} />
      {
        !isLoading ? (
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

        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )
      }

      <div>
        <Button variant="contained" sx={{ margin: "12px" }} onClick={editHandler}>
          Edit
        </Button>
        <Button variant="contained" sx={{ margin: "12px" }} onClick={backHandler}>
          Back
        </Button>
      </div>
    </div>
  );
}
export default EditPage;
