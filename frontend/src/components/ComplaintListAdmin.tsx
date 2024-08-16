import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography, IconButton, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllComplaints,
  deleteComplaint,
  changeStatus,
  editReply,
} from "../api/ComplaintApi";
// import ComplaintEdit from "./ComplaintEdit";
import ComplaintDelete from "./ComplaintDelete";
import { ComplaintResponse } from "../type";
import Snackbar from "@mui/material/Snackbar";
import ReplyIcon from "@mui/icons-material/Reply";
import ComplaintEditAdmin from "./ComplaintEditAdmin";

const ComplaintsListAdmin = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { data, isLoading, isError, refetch } = useQuery<ComplaintResponse[]>({
    queryKey: ["complaints"],
    queryFn: getAllComplaints,
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentComplaint, setCurrentComplaint] =
    useState<ComplaintResponse | null>(null);
  const [complaintIdToDelete, setComplaintIdToDelete] = useState<string | null>(
    null
  );

  const handleEdit = (complaint: ComplaintResponse) => {
    setCurrentComplaint(complaint);
    setOpenEdit(true);
  };

  const handleReply = async (id: string, replyText: string) => {
    try {
      if (currentComplaint && currentComplaint.reply) {
        console.log("Reply already exists for this complaint.");
        setOpenEdit(false);
        refetch();
        setSnackBarOpen(true);
        setSnackBarMessage("Reply already exists for this complaint");
        return;
      }

      const response = await editReply(id, replyText);
      console.log("Reply added:", response);
      setOpenEdit(false);
      refetch();
      setSnackBarOpen(true);
      setSnackBarMessage("Reply added successfully");
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Pending" ? "Resolved" : "Pending";
    try {
      await changeStatus(id, newStatus);
      refetch();
      setSnackBarOpen(true);
      setSnackBarMessage(`Complaint status changed to ${newStatus}`);
    } catch (error) {
      console.error("Failed to change complaint status:", error);
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
    return <Typography>Error</Typography>;
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
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{ color: "text.primary", fontSize: 16 }}
            >
              {new Date(complaint.createdAt).toDateString()}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "text.primary",
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 1,
              }}
            >
              {complaint.title}
            </Typography>
            <hr style={{ width: "100%", margin: "5px 0" }} />
            <Typography
              variant="body1"
              sx={{ color: "text.primary", fontSize: 20, marginBottom: 1 }}
            >
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
              sx={{ color: "text.primary", fontSize: 20, marginBottom: 1, fontWeight: 'bold' }}
            >
              Status: {complaint.status}
            </Typography>
          </Box>
          <Box>
            <Checkbox
              checked={(complaint.status as string) === "Resolved"}
              onChange={() =>
                handleStatusChange(complaint._id, complaint.status)
              }
            />
            <IconButton onClick={() => handleEdit(complaint)}>
              <ReplyIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => handleDelete(complaint._id)}>
              <DeleteIcon fontSize="large" color="action" />
            </IconButton>
          </Box>
        </Stack>
      ))}

      {currentComplaint && (
        <ComplaintEditAdmin
          open={openEdit}
          complaint={currentComplaint}
          header="Edit Complaint"
          onSave={handleReply}
          onCancel={handleCancelEdit}
          // onReply={handleReply} // Pass the handleReply function to handle reply functionality
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

export default ComplaintsListAdmin;
