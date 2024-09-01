import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { EvaluationFormResponse } from "../type";
import { getAllEvaluationForms } from "../api/EvaluationFormApi";
import EvaluationFormsTable from "./EvaluationFormsTable";

const EvaluationFormsListAdmin = () => {
  const [data, setData] = useState<EvaluationFormResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEvaluationForms();
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading data</Typography>;
  }

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h4" sx={{ color: "black" , marginBottom: 2 }}>
        List Of Evaluation Forms
      </Typography>
      <EvaluationFormsTable data={data} />
    </Box>
  );
};

export default EvaluationFormsListAdmin;
