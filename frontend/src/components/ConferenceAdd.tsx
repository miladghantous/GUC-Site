import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConferenceEdit from "./ConferenceEdit";
import { ConferenceResponse } from "../type";
import { createConference } from "../api/ConferenceApi";

const ConferenceAdd = () => {
  const [open, setOpen] = useState(false);

  const handleSave = async (title: string, link: string) => {
    try {
      console.log(title, link);
      const response = await createConference(title, link);
      console.log("Conference added:", response);
      setOpen(false);
      //refresh the conferences to get the updated list
      window.location.reload();
    } catch (error) {
      console.error("Failed to add conference:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const newConference: ConferenceResponse = {
    _id: "",
    title: "",
    link: "",
  };

  return (
    <>
      <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#f5f5f5",
            marginBottom: 2,
            padding: 1,
            boxShadow: 3,
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
          Add a new conference
        </Typography>
      </Box>

      <ConferenceEdit
        open={open}
        conference={newConference}
        header="Add Conference"
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ConferenceAdd;
