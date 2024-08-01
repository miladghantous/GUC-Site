import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { ConferenceResponse } from "../type";

interface ConferenceEditProps {
  open: boolean;
  conference: ConferenceResponse;
  header: string;
  onSave: (id:string, title: string, link: string) => void;
  onCancel: () => void;
}

const ConferenceEdit: React.FC<ConferenceEditProps> = ({
  open,
  conference,
  header,
  onSave,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState({
    title: conference.title,
    link: conference.link,
  });

  useEffect(() => {
    setFormValues({
      title: conference.title,
      link: conference.link,
    });
  }, [conference]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if(header === "Add Conference") {
      if(formValues.title === "" || formValues.link === "") {
        onCancel();
        return;
      }
      onSave(formValues.title, formValues.link,"");
      return;
    }
    onSave(conference._id, formValues.title, formValues.link);
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
          name="link"
          label="Link"
          type="text"
          fullWidth
          value={formValues.link}
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

export default ConferenceEdit;
