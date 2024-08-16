import ComplaintsList from "../components/ComplaintsList";
import ComplaintAdd from "../components/ComplaintAdd";
import Navbar from "../components/NavBar";
import { Box, Typography } from "@mui/material";
import ComplaintsListAdmin from "../components/ComplaintListAdmin";

const ComplaintAdmin = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          paddingTop: 8, // Adjust this value based on the height of your Navbar
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: 6, // Adjust this value as needed
            marginLeft: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "black",  paddingLeft: 4, paddingBottom: 3 }}
          >
            <h2>List Of Complaints</h2>
          </Typography>{" "}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ComplaintsListAdmin />
        </Box>
      </Box>
    </>
  );
};

export default ComplaintAdmin;
