import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddNewUserDailog from "./AddNewUserDialog";
import { UserResponse } from "../type";
import { addInstructor } from "../api/InstructorApi";
import { addAdmin } from "../api/AdminApi";

import Snackbar from "@mui/material/Snackbar";

const AddNewUser = () => {
  const [typoOpen, setTypoOpen] = useState(false);
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  // const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);

  const handleSave = async (email: string, username: string, role: string) => {
    try {
      console.log(
        "username: " + username + " email: " + email + " role: " + role
      );
      if (role === "ADMIN") {
        const response = await addAdmin(email, username, "Aa1");
        console.log("Admin added:", response);
      } else {
        const response = await addInstructor(email, username, "Aa1");
        console.log("Instructor added:", response);
      }
      setOpen(false);
      setSnackBarOpen(true);
      setSnackBarMessage("User added successfully!");
    } catch (error: any) {
      // Check if error response exists and has a request status
      if (
        error.response &&
        error.response.request &&
        error.response.request.status === 400
      ) {
        setTypoOpen(true);
      } else {
        console.error("Failed to add user:", error);
        setSnackBarMessage("Failed to add user. Please try again.");
        setSnackBarOpen(true);
      }
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const newUser: UserResponse = {
    _id: "",
    username: "",
    email: "",
    password: "Aa1",
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
          Add a new user
        </Typography>
      </Box>

      <AddNewUserDailog
        open={open}
        user={newUser}
        typoOpen={typoOpen}
        // role={role}
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

export default AddNewUser;
