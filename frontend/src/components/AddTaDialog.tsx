import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { TaResponse } from "../type";

interface AddTaDialogProps {
  open: boolean;
  user: TaResponse;
  typoOpen: boolean;
  onSave: (name: string) => void;
  onCancel: () => void;
}

const AddTaDialog: React.FC<AddTaDialogProps> = ({
  open,
  user,
  typoOpen,
  onSave,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState({
    name: user.name,
  });

  useEffect(() => {
    setFormValues({
      name: user.name,
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if (formValues.name === "") {
      onCancel();
      return;
    }
    console.log(typoOpen);
    console.log("rolehhhhhhhhhhhhhh ");
    onSave(formValues.name);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add a new TA</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formValues.name}
          onChange={handleChange}
        />
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
      <Box
        sx={{ display: "flex", justifyContent: "left", alignItems: "center", ml: 3 }}
      >
        {typoOpen && (
          <Typography sx={{ color: "red" }}>
            TA is already in the system
          </Typography>
        )}
      </Box>
    </Dialog>
  );
};

export default AddTaDialog;
