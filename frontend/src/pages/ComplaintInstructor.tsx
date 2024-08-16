import ComplaintsList from "../components/ComplaintsList";
import ComplaintAdd from "../components/ComplaintAdd";
import Navbar from "../components/NavBar";
import { Box } from "@mui/material";

const ComplaintInstructor = () => {
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
          <ComplaintAdd />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ComplaintsList />
        </Box>
      </Box>
    </>
  );
};

export default ComplaintInstructor;
