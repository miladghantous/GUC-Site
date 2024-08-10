import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileLinkEdit from "./FileLinkEdit";
import { FileLinkResponse } from "../type";
import { createFileLink} from "../api/FileLinkApi";
import Snackbar from "@mui/material/Snackbar";

interface FileLinkAddProps {
  onAdd: () => void;
}
const FileLinkAdd = (
  { onAdd }: FileLinkAddProps
) => {
  const [open, setOpen] = useState(false);
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSave = async (subject: string, link: string) => {
    try {
      console.log(subject, link);
      const response = await createFileLink(subject, link);
      console.log("FileLink added:", response);
      setOpen(false);
      onAdd();
      setSnackBarOpen(true);
      setSnackBarMessage("Link added successfully");
    } catch (error) {
      console.error("Failed to add filelink:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const newFileLink: FileLinkResponse = {
    _id: "",
    subject: "",
    link: "",
  };

  return (
    <>
      <Box display="flex" alignItems="center" >
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
          Add a new file link
        </Typography>
      </Box>

      <FileLinkEdit
        open={open}
        filelink={newFileLink}
        header="Add FileLink"
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

export default FileLinkAdd;
