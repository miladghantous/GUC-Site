import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileLinkEdit from "./FileLinkEdit";
import { FileLinkResponse } from "../type";
import { createFileLink } from "../api/FileLinkApi";

const FileLinkAdd = () => {
  const [open, setOpen] = useState(false);

  const handleSave = async (subject: string, link: string) => {
    try {
      console.log(subject, link);
      const response = await createFileLink(subject, link);
      console.log("FileLink added:", response);
      setOpen(false);
      //refresh the filelinks to get the updated list
      window.location.reload();
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
    </>
  );
};

export default FileLinkAdd;
