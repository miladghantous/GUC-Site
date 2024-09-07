import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AnnouncementEdit from "./AnnouncementEdit";
import { AnnouncementResponse } from "../type";
import {getAllAnnouncements ,createAnnouncement } from "../api/AnnouncementsApi";
import { useQuery } from "@tanstack/react-query";

import Snackbar from "@mui/material/Snackbar";

const AnnouncementAdd = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { refetch } = useQuery<
    AnnouncementResponse[]
  >({
    queryKey: ["announcements"],
    queryFn: getAllAnnouncements,
  });

  const handleSave = async (title: string, details: string) => {
    try {
      console.log(title, details);
      await createAnnouncement(title, details);
      // console.log("Announcement added:", response);
      setOpen(false);
      refetch();
      setSnackBarOpen(true);
      setSnackBarMessage("Announcement added successfully!");
    } catch (error) {
      console.error("Failed to add announcement:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const newAnnouncement: AnnouncementResponse = {
    _id: "",
    title: "",
    details: "",
    createdAt: new Date(),
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
          Add a new announcement
        </Typography>
      </Box>

      <AnnouncementEdit
        open={open}
        announcement={newAnnouncement}
        header="Add Announcement"
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

export default AnnouncementAdd;
