import AnnouncementsList from "../components/AnnouncementsList";
import AnnouncementAdd from "../components/AnnouncementAdd";
import Navbar from "../components/NavBar";
import { Box } from "@mui/material";

const Announcment = () => {
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
          <AnnouncementAdd />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnnouncementsList />
        </Box>
      </Box>
    </>
  );
};

export default Announcment;
