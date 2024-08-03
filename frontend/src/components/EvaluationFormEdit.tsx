import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { EvaluationFormResponse, InstructorResponse } from "../type";

interface EvaluationFormEditProps {
  open: boolean;
  evaluationform: EvaluationFormResponse;
  header: string;
  onSave: (id: string, title: string, instructor: InstructorResponse) => void;
  onCancel: () => void;
}

const EvaluationFormEdit: React.FC<EvaluationFormEditProps> = ({
  open,
  evaluationform,
  header,
  onSave,
  onCancel,
}) => {

  const [formValues, setFormValues] = useState({
    title: evaluationform.title,
    instructor: evaluationform.instructor,
  });

  useEffect(() => {
    setFormValues({
      title: evaluationform.title,
      instructor: evaluationform.instructor,
    });
  }, [evaluationform]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if (header === "Add EvaluationForm") {
      if (formValues.title === "" || formValues.instructor === null) {
        onCancel();
        return;
      }
      onSave("" , formValues.title, formValues.instructor);
      return;
    }
    onSave(evaluationform._id, formValues.title, formValues.instructor);
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

export default EvaluationFormEdit;
