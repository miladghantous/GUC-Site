import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  FormLabel,
} from "@mui/material";
import { UserResponse } from "../type";

interface AddUserDialogProps {
  open: boolean;
  user: UserResponse;
  typoMessage: string;
  typoOpen:boolean;
  onSave: (email: string, username: string, role: string) => void;
  onCancel: () => void;
}

const AddNewUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  user,
  typoMessage,
  typoOpen,
  onSave,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState({
    email: user.email,
    username: user.username,
    role: "", // Initial role state
  });

  useEffect(() => {
    setFormValues({
      email: user.email,
      username: user.username,
      role: "", // Reset role when user changes
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, role: e.target.value });
  };

  const handleSave = () => {
    if (
      formValues.email === "" ||
      formValues.username === "" ||
      formValues.role === ""
    ) {
      onCancel();
      return;
    }
    console.log("rolehhhhhhhhhhhhhh " + formValues.role);
    onSave(formValues.email, formValues.username, formValues.role);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add a new user</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="email"
          label="Email"
          type="text"
          fullWidth
          value={formValues.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          value={formValues.username}
          onChange={handleChange}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {typoOpen && (
            <Typography sx={{ color: "red" }}>*{typoMessage} </Typography>
          )}
        </Box>
        <FormControl component="fieldset" margin="dense">
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup
            name="role"
            value={formValues.role}
            onChange={handleRoleChange}
            row
          >
            <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
            <FormControlLabel
              value="INSTRUCTOR"
              control={<Radio />}
              label="Instructor"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#F57C00",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#F57C00",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewUserDialog;
