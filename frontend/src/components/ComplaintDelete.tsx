import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface ComplaintDeleteProps {
  open: boolean;
  complaintId: string;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const ComplaintDelete: React.FC<ComplaintDeleteProps> = ({
  open,
  complaintId,
  onDelete,
  onCancel,
}) => {
  const handleDelete = () => {
    onDelete(complaintId);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this complaint?
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

export default ComplaintDelete;
