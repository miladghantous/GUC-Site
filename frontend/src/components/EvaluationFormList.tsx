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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllEvaluationForms,
  editEvaluationForm,
  getUserEvaluationForms,
  deleteEvaluationForm,
  getTAName,
} from "../api/EvaluationFormApi";
import { EvaluationFormResponse, QuestionAnswerResponse } from "../type";
import EvaluationFormDelete from "./EvaluationFormDelete";

const EvaluationFormsList = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const queryClient = useQueryClient();
  const [data, setData] = useState<EvaluationFormResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [evaluationformIdToDelete, setEvaluationFormIdToDelete] = useState<
    string | null
  >(null);
  const { refetch } = useQuery<EvaluationFormResponse[]>({
    queryKey: ["evaluationforms"],
    queryFn: getUserEvaluationForms,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserEvaluationForms();
        console.log("Fetched Data:", response);
        //Loop on response for each

        // queryClient.setQueryData(["evaluationforms"], response);

        // refetch();
        setData(response);

        setIsLoading(false);

        // Force a re-render by updating the refresh key
        // setRefreshKey((prevKey) => prevKey + 1);

        // queryClient.invalidateQueries(["evaluationforms"]); // Invalidate and refetch
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refreshKey]);

  const handleDelete = (evaluationformId: string) => {
    setOpenDelete(true);
    setEvaluationFormIdToDelete(evaluationformId);
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await deleteEvaluationForm(id);
      console.log("Evaluation Form deleted:", response);
      setOpenDelete(false);
      // refetch();
      const updatedData = await getUserEvaluationForms();
      console.log("Updated Data:", updatedData);
      setData(updatedData);
      setSnackBarOpen(true);
      setSnackBarMessage("Evaluation Form deleted successfully");
    } catch (error) {
      console.error("Failed to delete Evaluation Form:", error);
    }
  };

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
            <Box display="flex" flexDirection="column" width="100%">
              <Typography
                variant="h1"
                sx={{ color: "black", fontSize: 20, fontWeight: "bold" }}
              >
                {/* Hello Akram, although it is giving the needed output but the error won't go away  */}
                {evaluationForm.evaluatedTA.name
                  ? evaluationForm.evaluatedTA.name
                  : "TA Name Missing"}
                - {evaluationForm.course}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Semester: {evaluationForm.semester}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton onClick={() => handleDelete(evaluationForm._id)}>
                <DeleteIcon fontSize={"large"} color="action" />
              </IconButton>
            </Box>
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

      {evaluationformIdToDelete && (
        <EvaluationFormDelete
          open={openDelete}
          evaluationFormId={evaluationformIdToDelete}
          onDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
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
