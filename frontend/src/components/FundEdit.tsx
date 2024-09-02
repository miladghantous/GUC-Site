import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { FundResponse } from "../type";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface FundEditProps {
  open: boolean;
  fund: FundResponse;
  header: string;
  onSave: (
    title: string,
    link: string,
    description: string,
    deadline: Dayjs | null,
    id: string,
  ) => void;
  onCancel: () => void;
}

const FundEdit: React.FC<FundEditProps> = ({
  open,
  fund,
  header,
  onSave,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState({
    title: fund.title,
    link: fund.link,
    description: fund.description,
    deadline: fund.deadline ? dayjs(fund.deadline) : null,
  });

  useEffect(() => {
    setFormValues({
      title: fund.title,
      link: fund.link,
      description: fund.description,
      deadline: fund.deadline ? dayjs(fund.deadline) : null,
    });
  }, [fund]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormValues({ ...formValues, deadline: date });
  };

  const handleSave = () => {
    if (header === "Add Fund") {
      if (
        formValues.title === "" ||
        formValues.link === "" ||
        formValues.description === ""
      ) {
        onCancel();
        return;
      } else {
        onSave(
          formValues.title,
          formValues.link,
          formValues.description,
          formValues.deadline,
          "",
        );
        return;
      }
    } else {
      onSave(
        formValues.title,
        formValues.link,
        formValues.description,
        formValues.deadline,
        fund._id,
      );
    }
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
          label="link"
          type="text"
          fullWidth
          value={formValues.link}
          onChange={handleChange}
        />
        <TextField sx={{mb:"20px"}}
          margin="dense"
          name="description"
          label="description"
          type="text"
          fullWidth
          value={formValues.description}
          onChange={handleChange}
          multiline
          rows={4} // Minimum number of rows (initial height)
          maxRows={10} // Maximum number of rows to which the TextField can expand
          variant="outlined"
        />
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Deadline"
              value={formValues.deadline}
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

export default FundEdit;
