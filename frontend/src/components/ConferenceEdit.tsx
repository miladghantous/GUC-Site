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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface ConferenceEditProps {
  open: boolean;
  conference: ConferenceResponse;
  header: string;
  onSave: (
    title: string,
    link: string,
    deadline: Dayjs | null,
    id: string,
  ) => void;
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
    deadline: conference.deadline ? dayjs(conference.deadline) : null,
  });

  useEffect(() => {
    setFormValues({
      title: conference.title,
      link: conference.link,
      deadline: conference.deadline ? dayjs(conference.deadline) : null,
    });
  }, [conference]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormValues({ ...formValues, deadline: date });
  };

  const handleSave = () => {
    if (header === "Add Conference") {
      if (
        (formValues.title === "" || formValues.link === "" )
      ) {
        onCancel();
        return;
      }
      onSave( formValues.title, formValues.link, formValues.deadline, "");
      return;
    }
    onSave(
      formValues.title,
      formValues.link,
      formValues.deadline,
      conference._id,
    );
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
  //i want the date to be null initially
    label="Deadline"
    value={formValues.deadline != null ? dayjs(formValues.deadline) :null} // Set initial value to null
    onChange={handleDateChange}
    slotProps={{
      actionBar: {
        actions: ['clear']
      }
    }}
  />
</LocalizationProvider>
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
