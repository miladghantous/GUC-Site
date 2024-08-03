import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import { InstructorResponse } from "../type";
import { getAllInstructors } from "../api/InstructorApi";

interface BasicSelectProps {
  value: InstructorResponse | null;
  onChange: (event: SelectChangeEvent) => void;
}

const BasicSelect: React.FC<BasicSelectProps> = ({ value, onChange }) => {
  const { data } = useQuery<InstructorResponse[]>({
    queryKey: ["instructors"],
    queryFn: getAllInstructors,
  });

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Instructor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value ? value.username : ""}
          label="Instructor"
          onChange={onChange}
        >
          {data?.map((instructor) => (
            <MenuItem key={instructor._id} value={instructor.username}>
              {instructor.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
