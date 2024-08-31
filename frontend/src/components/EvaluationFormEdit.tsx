import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { EvaluationFormResponse, TaResponse } from "../type";
import { useQuery } from "@tanstack/react-query";
import { getAllTas } from "../api/TaApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface EvaluationFormEditProps {
  open: boolean;
  evaluationform: EvaluationFormResponse;
  header: string;
  onSave: (
    // evaluator: string,
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
  const { data } = useQuery<TaResponse[]>({
    queryKey: ["ta"],
    queryFn: getAllTas,
  });

  console.log(data);

  const [formValues, setFormValues] = useState({
    // evaluator: evaluationform.evaluator,
    ta: evaluationform.evaluatedTA.name,
    course: evaluationform.course,
    semester: evaluationform.semester,
  });

  useEffect(() => {
    setFormValues({
      // evaluator: evaluationform.evaluator,
      ta: evaluationform.evaluatedTA.name,
      course: evaluationform.course,
      semester: evaluationform.semester,
    });
  }, [evaluationform]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectedTAChange = (event: SelectChangeEvent<string>) => {
    setFormValues({ ...formValues, ta: event.target.value });
  };

  const handleSave = () => {
    if (
      // !formValues.evaluator ||
      !formValues.ta ||
      !formValues.semester ||
      !formValues.course
    ) {
      onCancel();
      return;
    }
    onSave(
      // formValues.evaluator,
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Evaluated TA</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="ta"
            value={formValues.ta}
            label="ta"
            onChange={handleSelectedTAChange}
          >
            {data?.map((ta) => (
              <MenuItem key={ta._id} value={ta.name}>
                {ta.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
