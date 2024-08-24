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
  Checkbox,
  TextField,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [formId: string]: { [questionId: string]: string | string[] };
  }>({});

  useEffect(() => {
    if (data) {
      const initialAnswers: {
        [formId: string]: { [questionId: string]: string | string[] };
      } = {};
      data.forEach((form) => {
        initialAnswers[form._id] = {};
        form.questions.forEach((question) => {
          const existingAnswer = form.answers.find(
            (answer) => answer.questionId === question._id
          );
          if (existingAnswer) {
            initialAnswers[form._id][question._id] = existingAnswer.answer;
          }
        });
      });
      setSelectedAnswers(initialAnswers);
    }
  }, [data]);

  const handleAnswerChange = (
    formId: string,
    questionId: string,
    answer: string | string[],
    questionType: string
  ) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [formId]: {
        ...prevAnswers[formId],
        [questionId]: answer,
      },
    }));

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

                  {question.questionType === "Multiple Choice" && (
                    <RadioGroup
                      name={`question-${question._id}`}
                      value={
                        selectedAnswers[evaluationForm._id]?.[question._id] ||
                        ""
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
                  )}

                  {question.questionType === "Checkbox" && (
                    <Box>
                      {question.options.map((option, oIndex) => (
                        <FormControlLabel
                          key={oIndex}
                          control={
                            <Checkbox
                              checked={
                                Array.isArray(
                                  selectedAnswers[evaluationForm._id]?.[
                                    question._id
                                  ]
                                ) &&
                                selectedAnswers[evaluationForm._id]?.[
                                  question._id
                                ]?.includes(option)
                              }
                              onChange={(e) => {
                                const newValue = e.target.checked
                                  ? [
                                      ...(selectedAnswers[evaluationForm._id]?.[
                                        question._id
                                      ] || []),
                                      option,
                                    ]
                                  : (
                                      selectedAnswers[evaluationForm._id]?.[
                                        question._id
                                      ] as string[]
                                    ).filter((val) => val !== option);

                                handleAnswerChange(
                                  evaluationForm._id,
                                  question._id,
                                  newValue,
                                  question.questionType
                                );
                              }}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </Box>
                  )}

                  {question.questionType === "Rating" && (
                    <Box>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        {question.questionText.includes("Volume")
                          ? "Scale: 1 (zero) to 5 (many)"
                          : "Scale: 1 (Below average) to 5 (Excellent)"}
                      </Typography>
                      <Slider
                        value={Number(
                          selectedAnswers[evaluationForm._id]?.[question._id] ||
                            0
                        )}
                        onChange={(e, newValue) =>
                          handleAnswerChange(
                            evaluationForm._id,
                            question._id,
                            String(newValue),
                            question.questionType
                          )
                        }
                        aria-labelledby="rating-slider"
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  )}

                  {question.questionType === "Text" && (
                    <TextField
                      fullWidth
                      value={
                        selectedAnswers[evaluationForm._id]?.[question._id] ||
                        ""
                      }
                      onChange={(e) =>
                        handleAnswerChange(
                          evaluationForm._id,
                          question._id,
                          e.target.value,
                          question.questionType
                        )
                      }
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  )}
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
