import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTaDialog from "./AddTaDialog";
import { TaResponse } from "../type";
import { addTa, checkIfExists } from "../api/TaApi";
// import Alert from "@mui/material/Alert";

import Snackbar from "@mui/material/Snackbar";

const AddTa = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [typoOpen, setTypoOpen] = useState(false);

  const handleSave = async (name: string) => {
    try {
      const exists = await checkIfExists(name);
      console.log("does name exists:   " +exists);
      
      if (exists === false) {
        setTypoOpen(false);
      } else {
        setTypoOpen(true);
      }
      const response = await addTa(name);
      console.log(response);
      console.log("TA added:", response);
      setOpen(false);
      setSnackBarOpen(true);
      setSnackBarMessage("TA added successfully!");
    } catch (error) {
      console.error("Failed to add TA:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const newTA: TaResponse = {
    _id: "",
    name: "",
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
          Add a new TA
        </Typography>
      </Box>
      <AddTaDialog
        open={open}
        user={newTA}
        typoOpen={typoOpen}
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

export default AddTa;
