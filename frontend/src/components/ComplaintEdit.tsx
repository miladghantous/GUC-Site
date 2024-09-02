import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { ComplaintResponse } from "../type";

interface ComplaintEditProps {
  open: boolean;
  complaint: ComplaintResponse;
  header: string;
  onSave: (id: string, title: string, details: string) => void;
  onCancel: () => void;
}

const ComplaintEdit: React.FC<ComplaintEditProps> = ({
  open,
  complaint,
  header,
  onSave,
  onCancel,
}) => {

  const [formValues, setFormValues] = useState({
    title: complaint.title,
    details: complaint.details,
  });

  useEffect(() => {
    setFormValues({
      title: complaint.title,
      details: complaint.details,
    });
  }, [complaint]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if (header === "Add Complaint") {
      if (formValues.title === "" || formValues.details === "") {
        onCancel();
        return;
      }
      onSave(formValues.title, formValues.details, "");
      return;
    }
    onSave(complaint._id, formValues.title, formValues.details);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          value={formValues.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="details"
          label="Details"
          type="text"
          fullWidth
          value={formValues.details}
          onChange={handleChange}
          multiline
          rows={4} // Minimum number of rows (initial height)
          maxRows={10} // Maximum number of rows to which the TextField can expand
          variant="outlined"
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

    </Dialog>
  );
};

export default ComplaintEdit;
