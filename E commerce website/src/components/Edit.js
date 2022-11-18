import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ApiCall from "./ApiCall";

const useStyle = makeStyles({
  div: {
    margin: "30%",
    marginTop: "0%",
    marginBottom: "0%",
  },

});
function EditPage() {
  const prams = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line eqeqeq
  const [data] = ApiCall("https://node-postgres-sample.herokuapp.com/users");
  const [list] = data.filter((item) => item.id === +prams.id);
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  useEffect(() => {
    if (list) {
      setRole(list.role);
      setName(list.name);
      setEmail(list.email);
    }
  }, [list]);
  const classes = useStyle();
  const backToHome = () => {
    navigate("/");
  };
  return (
    <div className={classes.div}>
      <TextField fullWidth label="Name" id="fullWidth" value={name} />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" value={email} />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="role" value={role} />
      <Button variant="contained" sx={{ margin: "12px" }} onClick={backToHome}>
        Close
      </Button>
    </div>

  );
}
export default EditPage;
