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
  onSave: (id: string, reply: string) => void;
  onCancel: () => void;
}

const ComplaintEditAdmin: React.FC<ComplaintEditProps> = ({
  open,
  complaint,
  header,
  onSave,
  onCancel,
}) => {

  const [formValues, setFormValues] = useState({
    reply: complaint.reply,
    // details: complaint.details,
  });

  useEffect(() => {
    setFormValues({
      reply: complaint.reply,
    //   details: complaint.details,
    });
  }, [complaint]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if (header === "Add Complaint") {
      if (formValues.reply === "" ) {
        onCancel();
        return;
      }
      onSave(formValues.reply, "");
      return;
    }
    onSave(complaint._id, formValues.reply);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="reply"
          label="Reply"
          type="text"
          fullWidth
          value={formValues.reply}
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

    </Dialog>
  );
};

export default ComplaintEditAdmin;
