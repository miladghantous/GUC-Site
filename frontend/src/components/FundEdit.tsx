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

interface FundEditProps {
  open: boolean;
  fund: FundResponse;
  header: string;
  // Title, link, description, deadline
  onSave: (id:string, title: string, link: string, description: string, deadline: Date | null) => void;
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
  // Title, link, description, deadline
    title: fund.title,
    link: fund.link,
    description: fund.description,
    deadline: fund.deadline ? fund.deadline.toISOString().split('T')[0] : "" // Format date as string for input field
  });

  useEffect(() => {
    setFormValues({
          // Title, link, description, deadline
          title: fund.title,
          link: fund.link,
          description: fund.description,
          deadline: fund.deadline ? fund.deadline.toISOString().split('T')[0] : ""
        });
  }, [fund]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if(header === "Add Fund") {
          // Title, link, description, deadline
      if(formValues.title === "" ||
        formValues.link === "" ||
        formValues.description === "" ||
        formValues.deadline === "") {
        onCancel();
        return;
      }
      else{

          onSave('',formValues.title
            , formValues.link
            , formValues.description
            , new Date(formValues.deadline));
            return;
        }
    }
    else{

        onSave(fund._id, formValues.title, formValues.link, formValues.description, new Date(formValues.deadline));
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        {/* Title, link, description, deadline  */}
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
        <TextField
          margin="dense"
          name="description"
          label="description"
          type="text"
          fullWidth
          value={formValues.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="deadline"
          label="deadline"
          type="date"
          fullWidth
          value={formValues.deadline}
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

export default FundEdit;
