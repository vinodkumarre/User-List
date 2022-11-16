import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  div: {
    margin: "30%",
    marginTop: "0%",
    marginBottom: "0%",
  },

});
function EditPage() {
  const classes = useStyle();
  const [role, setRole] = React.useState("");
  const [open, setOpen] = React.useState(false);

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
      <TextField fullWidth label="Name" id="fullWidth" />
      <TextField fullWidth sx={{ marginTop: "12px", border: "none" }} label="Email" />
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
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ margin: "12px" }}>
        Add Users
      </Button>
    </div>

  );
}
export default EditPage;
