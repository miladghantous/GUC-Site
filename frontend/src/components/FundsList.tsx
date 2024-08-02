import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getAllFunds,
    deleteFund,
    editFund
} from "../api/FundApi";
import FundEdit from "./FundEdit";
import FundDelete  from "./FundDelete";
import { FundResponse } from "../type";
import Snackbar from "@mui/material/Snackbar";

const FundsList = () => {
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { data, isLoading, isError, refetch } = useQuery<
    FundResponse[]
  >({
    queryKey: ["funds"],
    queryFn: getAllFunds,
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentFund, setCurrentFund] =
    useState<FundResponse | null>(null);
  const [fundIdToDelete, setfundIdToDelete] = useState<
    string | null
  >(null);

  const handleEdit = (fund: FundResponse) => {
    setCurrentFund(fund);
    setOpenEdit(true);
  };
//title, link, description, deadline
  const handleSave = async ( title: string, link: string, description: string, deadline: Date | null, id: string,
  ) => {
    try {
        
        const response = await editFund( title, link, description, deadline, id);
      console.log("Fund edited:", response);
      setOpenEdit(false);
      refetch(); // Refetch the funds to get the updated list
      setSnackBarOpen(true);
      setSnackBarMessage("Fund edited successfully"); 
    } catch (error) {
      console.error("Failed to edit fund:", error);
    }
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = (fundId: string) => {
    setfundIdToDelete(fundId);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await deleteFund(id);
      console.log("Fund deleted:", response);
      setOpenDelete(false);
      refetch(); // Refetch the funds to get the updated list
      setSnackBarOpen(true);
      setSnackBarMessage("Fund deleted successfully");
    } catch (error) {
      console.error("Failed to delete fund:", error);
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
      {data?.map((fund, index) => (
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
            {/* title, link, description, deadline */}
            <Typography
              variant="h1"
              sx={{ color: "black", fontSize: 40, fontWeight: "bold" }}
            >
              {fund.title}
            </Typography>
            <hr></hr>
            <Typography variant="h2" sx={{ color: "black", fontSize: 20 }}>
              {fund.link}
            </Typography>
            <br></br>
            <Typography variant="h2" sx={{ color: "black", fontSize: 20 }}>
              {fund.description}
            </Typography>
            <br></br>
            <Typography variant="body2" sx={{ color: "black", fontSize: 20 }}>
              Deadline: {fund.deadline ? new Date(fund.deadline).toLocaleDateString() : "No deadline set"}
            </Typography>

          </Box>
          <Box>
            <IconButton onClick={() => handleEdit(fund)}>
              <EditIcon fontSize={"large"} />
            </IconButton>
            <IconButton onClick={() => handleDelete(fund._id)}>
              <DeleteIcon fontSize={"large"} color="action" />
            </IconButton>
          </Box>
        </Stack>
      ))}

      {currentFund && (
        <FundEdit
          open={openEdit}
          fund={currentFund}
          header="Edit Fund"
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {fundIdToDelete && (
        <FundDelete
          open={openDelete}
          FundId={fundIdToDelete}
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

export default FundsList;
