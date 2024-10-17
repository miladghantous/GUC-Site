import { useState } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  editFileLink,
  deleteFileLink,
} from "../api/FileLinkApi";
import FileLinkEdit from "./FileLinkEdit";
import FileLinkDelete from "./FileLinkDelete";
import { FileLinkResponse } from "../type";
import Snackbar from "@mui/material/Snackbar";
import Link from "@mui/material/Link";

interface linkProps {
  data: FileLinkResponse[];
  onEditOrDelete: () => void;
}

const FileLinksList = ({ data , onEditOrDelete }: linkProps) => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");


  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentFileLink, setCurrentFileLink] =
    useState<FileLinkResponse | null>(null);
  const [filelinkIdToDelete, setFileLinkIdToDelete] = useState<string | null>(
    null
  );

  const handleEdit = (filelink: FileLinkResponse) => {
    setCurrentFileLink(filelink);
    setOpenEdit(true);
  };

  const handleSave = async (id: string, subject: string, link: string) => {
    try {
      const response = await editFileLink(id, subject, link);
      console.log("FileLink edited:", response);
      setOpenEdit(false);
      onEditOrDelete();
      setSnackBarOpen(true);
      setSnackBarMessage("Link edited successfully");
    } catch (error) {
      console.error("Failed to edit filelink:", error);
    }
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = (filelinkId: string) => {
    setFileLinkIdToDelete(filelinkId);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await deleteFileLink(id);
      console.log("FileLink deleted:", response);
      setOpenDelete(false);
      onEditOrDelete();
      setSnackBarOpen(true);
      setSnackBarMessage("Link deleted successfully");
    } catch (error) {
      console.error("Failed to delete filelink:", error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Box sx={{ width: "100%", padding: 2, alignItems: "center" }}>
      <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h4" sx={{ color: "black" , marginBottom: 2 }}>
        List Of Links
      </Typography>
    </Box>
      {data?.map((filelink, index) => (
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
              sx={{ color: "black", fontSize: 24, fontWeight: "bold" }}
            >
              {filelink.subject}
            </Typography>
            <hr></hr>
            <Link
              href={filelink.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontSize: "1rem" }}
            >
              {" "}
              {filelink.link}
            </Link>
          </Box>
          <Box>
            <IconButton onClick={() => handleEdit(filelink)}>
              <EditIcon fontSize={"large"} />
            </IconButton>
            <IconButton onClick={() => handleDelete(filelink._id)}>
              <DeleteIcon fontSize={"large"} color="action" />
            </IconButton>
          </Box>
        </Stack>
      ))}

      {currentFileLink && (
        <FileLinkEdit
          open={openEdit}
          filelink={currentFileLink}
          header="Edit Link"
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {filelinkIdToDelete && (
        <FileLinkDelete
          open={openDelete}
          filelinkId={filelinkIdToDelete}
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

export default FileLinksList;
