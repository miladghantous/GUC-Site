import ConferencesList from "../components/ConferencesList";
import ConferenceAdd from "../components/ConferenceAdd";
import Navbar from "../components/NavBar";
import { Box } from "@mui/material";

const Conference = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          paddingTop: 8, 
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: 6, 
            marginLeft: 4,
          }}
        >
          <ConferenceAdd />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ConferencesList />
        </Box>
      </Box>
    </>
  );
};

export default Conference;
