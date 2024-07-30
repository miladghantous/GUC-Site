import AnnouncementCard from "../components/AnnouncementCard";
import FilesCard from "../components/FilesCard";
import FundsCard from "../components/FundsCard";
import ConferencesCard from "../components/ConferencesCard";
import EvaluationCard from "../components/EvaluationCard";
import CompliantsCard from "../components/CompliantsCard";
import { Box } from "@mui/material";

const Home = () => {
  return (
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
  );
};

export default Home;
