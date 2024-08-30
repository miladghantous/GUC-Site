import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ComplaintEdit from "./ComplaintEdit";
import { ComplaintResponse, Status } from "../type";
import {
  getAllComplaints,
  createComplaint,
  getUserComplaints,
} from "../api/ComplaintApi";
import { useQuery } from "@tanstack/react-query";

import Snackbar from "@mui/material/Snackbar";

const ComplaintAdd = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { refetch } = useQuery<ComplaintResponse[]>({
    queryKey: ["complaints"],
    queryFn: getUserComplaints,
    onSuccess: (data) => {
      console.log("Fetched complaints:", data);
    },
    onError: (error) => {
      console.error("Error fetching complaints:", error);
    },
  });

  const handleSave = async (title: string, details: string) => {
    try {
      console.log(title, details);
      const response = await createComplaint(title, details);
      // console.log("Complaint added:", response);
      refetch();
      setOpen(false);
      setSnackBarOpen(true);
      setSnackBarMessage("Complaint added successfully!");
    } catch (error) {
      console.error("Failed to add complaint:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const newComplaint: ComplaintResponse = {
    _id: "",
    title: "",
    details: "",
    // user: "",
    createdAt: new Date(),
    status: Status.Pending, // Set the default status to Pending from the enum
    reply: "",
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#f5f5f5",
            marginBottom: 2,
            padding: 1,
            boxShadow: 3,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#F57C00",
              boxShadow: 6,
            },
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ color: "black", paddingLeft: 4, paddingBottom: 3 }}
        >
          Add a new complaint
        </Typography>
      </Box>

      <ComplaintEdit
        open={open}
        complaint={newComplaint}
        header="Add Complaint"
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <Snackbar
        open={SnackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
        message={snackBarMessage}
      />
    </>
  );
};

export default ComplaintAdd;
