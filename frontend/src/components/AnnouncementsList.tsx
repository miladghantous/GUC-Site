import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllAnnouncements,
  editAnnouncement,
  deleteAnnouncement,
} from "../api/AnnouncementsApi";
import AnnouncementEdit from "./AnnouncementEdit";
import AnnouncementDelete from "./AnnouncementDelete";
import { AnnouncementResponse } from "../type";
import Snackbar from "@mui/material/Snackbar";


const AnnouncementsList = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { data, isLoading, isError, refetch } = useQuery<
    AnnouncementResponse[]
  >({
    queryKey: ["announcements"],
    queryFn: getAllAnnouncements,
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] =
    useState<AnnouncementResponse | null>(null);
  const [announcementIdToDelete, setAnnouncementIdToDelete] = useState<
    string | null
  >(null);

  const handleEdit = (announcement: AnnouncementResponse) => {
    setCurrentAnnouncement(announcement);
    setOpenEdit(true);
  };

  const handleSave = async (id: string, title: string, details: string) => {
    try {
      const response = await editAnnouncement(id, title, details);
      console.log("Announcement edited:", response);
      setOpenEdit(false);
      refetch(); 
      setSnackBarOpen(true);
      setSnackBarMessage("Announcement edited successfully"); 
    } catch (error) {
      console.error("Failed to edit announcement:", error);
    }
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = (announcementId: string) => {
    setAnnouncementIdToDelete(announcementId);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await deleteAnnouncement(id);
      console.log("Announcement deleted:", response);
      setOpenDelete(false);
      refetch(); 
      setSnackBarOpen(true);
      setSnackBarMessage("Announcement deleted successfully");
    } catch (error) {
      console.error("Failed to delete announcement:", error);
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
    <Box sx={{ width: "100%", padding: 2 , alignItems:"center"}}>
      <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h4" sx={{ color: "black" , marginBottom: 2 }}>
        List Of Announcemnets
      </Typography>
    </Box>
      {data?.map((announcement, index) => (
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
            <Typography variant="h2" sx={{ color: "black", fontSize: 20 }}>
              {new Date(announcement.createdAt).toDateString()}
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: "black", fontSize: 40, fontWeight: "bold" }}
            >
              {announcement.title}
            </Typography>
            <hr/>
            <Typography variant="h2" sx={{ color: "black", fontSize: 25 }}>
              {announcement.details}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => handleEdit(announcement)}>
              <EditIcon fontSize={"large"} />
            </IconButton>
            <IconButton onClick={() => handleDelete(announcement._id)}>
              <DeleteIcon fontSize={"large"} color="action" />
            </IconButton>
          </Box>
        </Stack>
      ))}

      {currentAnnouncement && (
        <AnnouncementEdit
          open={openEdit}
          announcement={currentAnnouncement}
          header="Edit Announcement"
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {announcementIdToDelete && (
        <AnnouncementDelete
          open={openDelete}
          announcementId={announcementIdToDelete}
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

export default AnnouncementsList;
