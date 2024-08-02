import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { AnnouncementResponse } from "../type";

interface AnnouncementEditProps {
  open: boolean;
  announcement: AnnouncementResponse;
  header: string;
  onSave: (id: string, title: string, details: string) => void;
  onCancel: () => void;
}

const AnnouncementEdit: React.FC<AnnouncementEditProps> = ({
  open,
  announcement,
  header,
  onSave,
  onCancel,
}) => {

  const [formValues, setFormValues] = useState({
    title: announcement.title,
    details: announcement.details,
  });

  useEffect(() => {
    setFormValues({
      title: announcement.title,
      details: announcement.details,
    });
  }, [announcement]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if (header === "Add Announcement") {
      if (formValues.title === "" || formValues.details === "") {
        onCancel();
        return;
      }
      onSave(formValues.title, formValues.details, "");
      return;
    }
    onSave(announcement._id, formValues.title, formValues.details);
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

export default AnnouncementEdit;
