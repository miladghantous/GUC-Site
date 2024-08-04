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
import BasicSelect from "./InstructorDropDownMenu";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import { getAllInstructors } from "../api/InstructorApi";

interface EvaluationFormEditProps {
  open: boolean;
  evaluationform: EvaluationFormResponse;
  header: string;
  onSave: ( title: string, instructor: InstructorResponse,id: string) => void;
  onCancel: () => void;
}

const EvaluationFormEdit: React.FC<EvaluationFormEditProps> = ({
  open,
  evaluationform,
  header,
  onSave,
  onCancel,
}) => {
  const { data: instructors } = useQuery<InstructorResponse[]>({
    queryKey: ["instructors"],
    queryFn: getAllInstructors,
  });

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

  const handleInstructorChange = (event: SelectChangeEvent<string>) => {
    const selectedInstructor = instructors?.find(
      (instructor) => instructor.username === event.target.value
    );
    setFormValues({ ...formValues, instructor: selectedInstructor || formValues.instructor });
  };

  const handleSave = () => {
    if (header === "Add EvaluationForm") {
      if (formValues.title === "" || !formValues.instructor) {
        onCancel();
        return;
      }
      onSave(formValues.title, formValues.instructor,"");
      return;
    }

    onSave( formValues.title, formValues.instructor , evaluationform._id);
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
        <BasicSelect value={formValues.instructor} onChange={handleInstructorChange} />
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
