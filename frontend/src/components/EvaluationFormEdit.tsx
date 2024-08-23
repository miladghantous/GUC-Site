import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { EvaluationFormResponse, UserResponse, TaResponse } from "../type";
import BasicSelect from "./InstructorDropDownMenu";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import { getAllInstructors } from "../api/InstructorApi";

interface EvaluationFormEditProps {
  open: boolean;
  evaluationform: EvaluationFormResponse;
  header: string;
  onSave: (
    evaluator: string,
    ta: string,
    semester: string,
    course: string
  ) => void;
  onCancel: () => void;
}

const EvaluationFormEdit: React.FC<EvaluationFormEditProps> = ({
  open,
  evaluationform,
  header,
  onSave,
  onCancel,
}) => {
  // const { data: instructors } = useQuery<InstructorResponse[]>({
  //   queryKey: ["instructors"],
  //   queryFn: getAllInstructors,
  // });

  const [formValues, setFormValues] = useState({
    evaluator: evaluationform.evaluator,
    ta: evaluationform.evaluatedTA,
    course: evaluationform.course,
    semester: evaluationform.semester,
    // instructor: evaluationform.instructor,
  });

  useEffect(() => {
    setFormValues({
      evaluator: evaluationform.evaluator,
      ta: evaluationform.evaluatedTA,
      course: evaluationform.course,
      semester: evaluationform.semester,
      // instructor: evaluationform.instructor,
    });
  }, [evaluationform]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const handleInstructorChange = (event: SelectChangeEvent<string>) => {
  //   const selectedInstructor = instructors?.find(
  //     (instructor) => instructor.username === event.target.value
  //   );
  //   setFormValues({
  //     ...formValues,
  //     instructor: selectedInstructor || formValues.instructor,
  //   });
  // };

  const handleSave = () => {
    if (
      // !formValues.instructor ||
      !formValues.evaluator ||
      !formValues.ta ||
      !formValues.semester ||
      !formValues.course
    ) {
      onCancel();
      return;
    }
    onSave(
      // formValues.instructor,
      // evaluationform.evaluatedTA,
      formValues.evaluator,
      formValues.ta,
      formValues.semester,
      formValues.course
    );
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
      <TextField
          autoFocus
          margin="dense"
          name="evaluator"
          label="Instructor"
          type="text"
          fullWidth
          value={formValues.evaluator}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="ta"
          label="TA"
          type="text"
          fullWidth
          value={formValues.ta}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="course"
          label="Course"
          type="text"
          fullWidth
          value={formValues.course}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="semester"
          label="Semester"
          type="text"
          fullWidth
          value={formValues.semester}
          onChange={handleChange}
        />
        {/* <BasicSelect
          value={formValues.instructor?.username || ""}
          onChange={handleInstructorChange}
        /> */}
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
