import FundsList from "../components/FundsList";
import FundAdd from "../components/FundAdd";
import Navbar from "../components/NavBar";
import { Box } from "@mui/material";

const Fund = () => {
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
          <FundAdd />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FundsList />
        </Box>
      </Box>
    </>
  );
};

export default Fund;
