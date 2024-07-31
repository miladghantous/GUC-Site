import AnnouncementCard from "../components/AnnouncementCard";
import FilesCard from "../components/FilesCard";
import FundsCard from "../components/FundsCard";
import ConferencesCard from "../components/ConferencesCard";
import EvaluationCard from "../components/EvaluationCard";
import CompliantsCard from "../components/CompliantsCard";
import { Box } from "@mui/material";
import Navbar from "../components/NavBar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 5,
          }}
        >
          <AnnouncementCard />
          <FilesCard />
          <FundsCard />
          <ConferencesCard />
          <EvaluationCard />
          <CompliantsCard />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
