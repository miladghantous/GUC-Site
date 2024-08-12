import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { IconButton, Box } from "@mui/material";

const ChangePasswordComponent = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/changePassword"); 
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={handleEditClick}
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
        <EditIcon fontSize="large" />
      </IconButton>
      <Typography
        variant="h6"
        sx={{ color: "black", paddingLeft: 4, paddingBottom: 3 }}
      >
        Change Password
      </Typography>
    </Box>
  );
};

export default ChangePasswordComponent;
