import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface ConferenceDeleteProps {
  open: boolean;
  conferenceId: string;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const ConferenceDelete: React.FC<ConferenceDeleteProps> = ({
  open,
  conferenceId,
  onDelete,
  onCancel,
}) => {
  const handleDelete = () => {
    onDelete(conferenceId);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this conference?
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

export default ConferenceDelete;
