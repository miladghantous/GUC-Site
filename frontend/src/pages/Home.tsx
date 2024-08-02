import { Box } from "@mui/material";
import Navbar from "../components/NavBar";
import Card from "../components/Card";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";


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
          <Card
            title="Announcements"
            icon={<CampaignOutlinedIcon sx={{ fontSize: 100 }} />}
            link="/announcements"
          />
          <Card
            title="Files"
            icon={<FileCopyOutlinedIcon sx={{ fontSize: 100 }} />}
            link="/filelinks"
          />
          <Card
            title="Funds"
            icon={<AttachMoneyOutlinedIcon sx={{ fontSize: 100 }} />}
            link="/funds"
          />
          <Card
            title="Complaints"
            icon={<WarningAmberOutlinedIcon sx={{ fontSize: 100 }} />}
            link="/compliants"
          />
          <Card
            title="Conferences"
            icon={<Groups2OutlinedIcon sx={{ fontSize: 100 }} />}
            link="/conferences"
          />
          <Card
            title="Evaluation"
            icon={<AssessmentOutlinedIcon sx={{ fontSize: 100 }} />}
            link="/evaluations"
          />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
