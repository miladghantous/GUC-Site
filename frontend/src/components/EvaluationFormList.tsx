import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getAllEvaluationForms,
  deleteEvaluationForm,
  editEvaluationForm,
} from "../api/EvaluationFormApi";
import { EvaluationFormResponse, InstructorResponse } from "../type";
import EvaluationFormEdit from "./EvaluationFormEdit";
import InstructorUserName from "./InstructorUserName";
import EvaluationFormDelete from "./EvaluationFormDelete";

const EvaluationFormsList = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { data, isLoading, isError, refetch } = useQuery<
    EvaluationFormResponse[]
  >({
    queryKey: ["evaluationforms"],
    queryFn: getAllEvaluationForms,
  });
  // const queryClient = useQueryClient();

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
    title: string,
    instructor: InstructorResponse,
    id: string
  ) => {
    try {
      const response = await editEvaluationForm(title, instructor, id);
      console.log("Evaluation form edited:", response);
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
    <Box sx={{ width: "100%", padding: 2, alignItems: "center" }}>
      {data?.map((evaluationform, index) => (
        <Accordion
          key={index}
          sx={{
            marginBottom: 2,
            backgroundColor: "#f5f5f5",
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
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#f5f5f5", boxShadow: 3 }}
          >
            <Typography
              variant="h1"
              sx={{ color: "black", fontSize: 20, fontWeight: "bold" }}
            >
              {evaluationform.title}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton onClick={() => handleEdit(evaluationform)}>
                <EditIcon fontSize={"large"} />
              </IconButton>
              <IconButton onClick={() => handleDelete(evaluationform._id)}>
                <DeleteIcon fontSize={"large"} color="action" />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#fff", padding: 2 }}>
            <Typography variant="h2" sx={{ color: "black", fontSize: 15 }}>
              Instructor:{" "}
              <InstructorUserName evaluationFormId={evaluationform._id} />
            </Typography>
          </AccordionDetails>
        </Accordion>
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
          evaluationFormId={evaluationformIdToDelete}
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
