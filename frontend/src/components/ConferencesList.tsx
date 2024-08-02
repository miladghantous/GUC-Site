import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllConferences,
  editConference,
  deleteConference,
} from "../api/ConferenceApi";
import ConferenceEdit from "./ConferenceEdit";
import ConferenceDelete from "./ConferenceDelete";
import { ConferenceResponse } from "../type";
import Snackbar from "@mui/material/Snackbar";


const ConferencesList = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { data, isLoading, isError, refetch } = useQuery<
    ConferenceResponse[]
  >({
    queryKey: ["conferences"],
    queryFn: getAllConferences,
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentConference, setCurrentConference] =
    useState<ConferenceResponse | null>(null);
  const [conferenceIdToDelete, setConferenceIdToDelete] = useState<
    string | null
  >(null);

  const handleEdit = (conference: ConferenceResponse) => {
    setCurrentConference(conference);
    setOpenEdit(true);
  };

  const handleSave = async (id: string, title: string, link: string) => {
    try {
      const response = await editConference(id, title, link);
      console.log("Conference edited:", response);
      setOpenEdit(false);
      refetch(); // Refetch the conferences to get the updated list
      setSnackBarOpen(true);
      setSnackBarMessage("Conference edited successfully"); 
    } catch (error) {
      console.error("Failed to edit conference:", error);
    }
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = (conferenceId: string) => {
    setConferenceIdToDelete(conferenceId);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await deleteConference(id);
      console.log("Conference deleted:", response);
      setOpenDelete(false);
      refetch(); // Refetch the conferences to get the updated list
      setSnackBarOpen(true);
      setSnackBarMessage("Conference deleted successfully");
    } catch (error) {
      console.error("Failed to delete conference:", error);
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
      {data?.map((conference, index) => (
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
              {conference.title}
            </Typography>
            <Typography variant="h2" sx={{ color: "black", fontSize: 25 }}>
              {conference.link}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => handleEdit(conference)}>
              <EditIcon fontSize={"large"} />
            </IconButton>
            <IconButton onClick={() => handleDelete(conference._id)}>
              <DeleteIcon fontSize={"large"} color="action" />
            </IconButton>
          </Box>
        </Stack>
      ))}

      {currentConference && (
        <ConferenceEdit
          open={openEdit}
          conference={currentConference}
          header="Edit Conference"
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {conferenceIdToDelete && (
        <ConferenceDelete
          open={openDelete}
          conferenceId={conferenceIdToDelete}
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

export default ConferencesList;
