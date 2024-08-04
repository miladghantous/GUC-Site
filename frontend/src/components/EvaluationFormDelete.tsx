import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface EvaluationFormDeleteProps {
  open: boolean;
  evaluationFormId: string;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const EvaluationFormDelete: React.FC<EvaluationFormDeleteProps> = ({
  open,
  evaluationFormId,
  onDelete,
  onCancel,
}) => {
  const handleDelete = () => {
    onDelete(evaluationFormId);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this evaluation form?
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

export default EvaluationFormDelete;
