import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { FileLinkResponse } from "../type";

interface FileLinkEditProps {
  open: boolean;
  filelink: FileLinkResponse;
  header: string;
  onSave: (id:string, subject: string, link: string) => void;
  onCancel: () => void;
}

const FileLinkEdit: React.FC<FileLinkEditProps> = ({
  open,
  filelink,
  header,
  onSave,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState({
    subject: filelink.subject,
    link: filelink.link,
  });

  useEffect(() => {
    setFormValues({
      subject: filelink.subject,
      link: filelink.link,
    });
  }, [filelink]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if(header === "Add FileLink") {
      if(formValues.subject === "" || formValues.link === "") {
        onCancel();
        return;
      }
      onSave(formValues.subject, formValues.link,"");
      return;
    }
    onSave(filelink._id, formValues.subject, formValues.link);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="subject"
          label="subject"
          type="text"
          fullWidth
          value={formValues.subject}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="link"
          label="link"
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

export default FileLinkEdit;
