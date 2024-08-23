import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getAllEvaluationForms,
  editEvaluationForm,
} from "../api/EvaluationFormApi";
import { EvaluationFormResponse, QuestionAnswerResponse } from "../type";

const EvaluationFormsList = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { data, isLoading, isError, refetch } = useQuery<
    EvaluationFormResponse[]
  >({
    queryKey: ["evaluationforms"],
    queryFn: getAllEvaluationForms,
  });

  // Store selected answers for each form separately
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [formId: string]: { [questionId: string]: string };
  }>({});

  const handleAnswerChange = (
    formId: string,
    questionId: string,
    answer: string,
    questionType: string
  ) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [formId]: {
        ...prevAnswers[formId],
        [questionId]: answer,
      },
    }));

    // Send the answer to the server immediately after selection
    editEvaluationForm(formId, questionId, answer, questionType)
      .then(() => {
        setSnackBarOpen(true);
        setSnackBarMessage("Answer updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update answer:", error);
      });
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error</Typography>;
  }

  return (
    <Box sx={{ width: "100%", padding: 2, alignItems: "center" }}>
      {data?.map((evaluationForm) => (
        <Accordion
          key={evaluationForm._id}
          sx={{
            marginBottom: 2,
            backgroundColor: "#f5f5f5",
            padding: 1,
            boxShadow: 3,
            borderRadius: 2,
            borderBottom: "1px solid #ddd",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#F57C00",
              boxShadow: 6,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#f5f5f5", boxShadow: 3 }}
          >
            <Typography
              variant="h1"
              sx={{ color: "black", fontSize: 20, fontWeight: "bold" }}
            >
              {evaluationForm.course}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#fff", padding: 2 }}>
            {evaluationForm.questions.map(
              (question: QuestionAnswerResponse) => (
                <Box key={question._id} sx={{ marginBottom: 2 }}>
                  <Typography variant="h6" sx={{ color: "black" }}>
                    {question.questionText}
                  </Typography>
                  <RadioGroup
                    name={`question-${question._id}`}
                    value={
                      selectedAnswers[evaluationForm._id]?.[question._id] || ""
                    }
                    onChange={(e) =>
                      handleAnswerChange(
                        evaluationForm._id,
                        question._id,
                        e.target.value,
                        question.questionType
                      )
                    }
                  >
                    {question.options.map((option, oIndex) => (
                      <FormControlLabel
                        key={oIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </Box>
              )
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
        message={snackBarMessage}
      />
    </Box>
  );
};

export default EvaluationFormsList;
