import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface FileLinkDeleteProps {
  open: boolean;
  filelinkId: string;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const FileLinkDelete: React.FC<FileLinkDeleteProps> = ({
  open,
  filelinkId,
  onDelete,
  onCancel,
}) => {
  const handleDelete = () => {
    onDelete(filelinkId);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this filelink?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#F57C00",
            },
          }}
        >
          No
        </Button>
        <Button
          onClick={handleDelete}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#F57C00",
            },
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileLinkDelete;
