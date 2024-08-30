import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  editComplaint,
  deleteComplaint,
  getUserComplaints,
} from "../api/ComplaintApi";
import ComplaintEdit from "./ComplaintEdit";
import ComplaintDelete from "./ComplaintDelete";
import { ComplaintResponse } from "../type";
import Snackbar from "@mui/material/Snackbar";

const ComplaintsList = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentComplaint, setCurrentComplaint] =
    useState<ComplaintResponse | null>(null);
  const [complaintIdToDelete, setComplaintIdToDelete] = useState<string | null>(
    null
  );

  // Fetch data using useQuery
  const { data, isLoading, isError, refetch } = useQuery<ComplaintResponse[]>({
    queryKey: ["complaints"],
    queryFn: getUserComplaints,
    onSuccess: (data) => {
      console.log("Fetched complaints:", data);
    },
    onError: (error) => {
      console.error("Error fetching complaints:", error);
    },
  });

  const handleEdit = (complaint: ComplaintResponse) => {
    setCurrentComplaint(complaint);
    setOpenEdit(true);
  };

  const handleSave = async (id: string, title: string, details: string) => {
    try {
      const response = await editComplaint(id, title, details);
      console.log("Complaint edited:", response);
      setOpenEdit(false);
      refetch();
      setSnackBarOpen(true);
      setSnackBarMessage("Complaint edited successfully");
    } catch (error) {
      console.error("Failed to edit complaint:", error);
    }
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = (complaintId: string) => {
    setComplaintIdToDelete(complaintId);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await deleteComplaint(id);
      console.log("Complaint deleted:", response);
      setOpenDelete(false);
      refetch();
      setSnackBarOpen(true);
      setSnackBarMessage("Complaint deleted successfully");
    } catch (error) {
      console.error("Failed to delete complaint:", error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading complaints.</Typography>;
  }

  return (
    <Box sx={{ width: "100%", padding: 2, alignItems: "center" }}>
      {data?.map((complaint, index) => (
        <Stack
          key={index}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: "#f5f5f5",
            marginBottom: 2,
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
          <Box>
            <Typography variant="h2" sx={{ color: "black", fontSize: 20 }}>
              {new Date(complaint.createdAt).toDateString()}
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: "black", fontSize: 40, fontWeight: "bold" }}
            >
              {complaint.title}
            </Typography>
            <hr />
            <Typography variant="h2" sx={{ color: "black", fontSize: 25 }}>
              {complaint.details}
            </Typography>
            {complaint.reply && (
              <Typography
                variant="body1"
                sx={{ color: "text.primary", fontSize: 20, marginBottom: 1 }}
              >
                Reply: {complaint.reply}
              </Typography>
            )}
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                fontSize: 20,
                marginBottom: 1,
                fontWeight: "bold",
              }}
            >
              Status: {complaint.status}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => handleEdit(complaint)}>
              <EditIcon fontSize={"large"} />
            </IconButton>
            <IconButton onClick={() => handleDelete(complaint._id)}>
              <DeleteIcon fontSize={"large"} color="action" />
            </IconButton>
          </Box>
        </Stack>
      ))}

      {currentComplaint && (
        <ComplaintEdit
          open={openEdit}
          complaint={currentComplaint}
          header="Edit Complaint"
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {complaintIdToDelete && (
        <ComplaintDelete
          open={openDelete}
          complaintId={complaintIdToDelete}
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

export default ComplaintsList;
