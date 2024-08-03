import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllEvaluationForms,
  deleteEvaluationForm,
//   createEvaluationForm,
  editEvaluationForm,
//   addQuestionAnswer,
//   updateQuestionAnswer,
//   deleteQuestionAnswer,
} from "../api/EvaluationFormApi";
import Snackbar from "@mui/material/Snackbar";
import {
  EvaluationFormResponse,
  InstructorResponse,
  QuestionAnswerResponse,
} from "../type";

const EvaluationFormsList = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { data, isLoading, isError, refetch } = useQuery<
    EvaluationFormResponse[]
  >({
    queryKey: ["evaluationforms"],
    queryFn: getAllEvaluationForms,
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentEvaluationForm, setCurrentEvaluationForm] =
    useState<EvaluationFormResponse | null>(null);
  const [evaluationformIdToDelete, setEvaluationFormIdToDelete] = useState<
    string | null
  >(null);

  const handleEdit = (evaluationform: EvaluationFormResponse) => {
    setOpenEdit(true);
    setCurrentEvaluationForm(evaluationform);
  };

  const handleDelete = (evaluationformId: string) => {
    setOpenDelete(true);
    setEvaluationFormIdToDelete(evaluationformId);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleSave = async (
    id: string,
    title: string,
    questions: [QuestionAnswerResponse],
    instructor: InstructorResponse
  ) => {
    try {
      const response = await editEvaluationForm(
        id,
        title,
        questions,
        instructor
      );
      console.log("Announcement edited:", response);
      setOpenEdit(false);
      refetch();
      setSnackBarOpen(true);
      setSnackBarMessage("Evaluation form updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };
  
  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await deleteEvaluationForm(id);
      console.log("Evaluation Form deleted:", response);
      setOpenDelete(false);
      refetch(); 
      setSnackBarOpen(true);
      setSnackBarMessage("Evaluation Form deleted successfully");
    } catch (error) {
      console.error("Failed to delete Evaluation Form:", error);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error</Typography>;
  }


  return (
    <Box sx={{ width: "100%", padding: 2 , alignItems:"center"}}>
      {data?.map((evaluationform, index) => (
        <Stack
          key={index}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: "#f5f5f5",
            marginBottom: 2,
            padding: 1,
            boxShadow: 3, // Add shadow
            borderRadius: 2,
            borderBottom: "1px solid #ddd",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#F57C00",
              boxShadow: 6,
            },
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{ color: "black", fontSize: 40, fontWeight: "bold" }}
            >
              {evaluationform.title}
            </Typography>
            <hr/>
            <Typography variant="h2" sx={{ color: "black", fontSize: 25 }}>
              Instructor: {evaluationform.instructor.username}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => handleEdit(evaluationform)}>
              <EditIcon fontSize={"large"} />
            </IconButton>
            <IconButton onClick={() => handleDelete(evaluationform._id)}>
              <DeleteIcon fontSize={"large"} color="action" />
            </IconButton>
          </Box>
        </Stack>
      ))}

      {currentEvaluationForm && (
        <EvaluationFormEdit
          open={openEdit}
          evaluationform={currentEvaluationForm}
          header="Edit EvaluationForm"
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {evaluationformIdToDelete && (
        <EvaluationFormDelete
          open={openDelete}
          evaluationformId={evaluationformIdToDelete}
          onDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <Snackbar
        open={SnackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
        message={snackBarMessage}
      />
    </Box>
  );

};

export default EvaluationFormsList;
