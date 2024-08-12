import { Box } from "@mui/material";
import Navbar from "../components/NavBar";
import Card from "../components/Card";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AddNewUser from "../components/AddNewUser";

const HomeAdmin = () => {
  return (
    <div>
      <Navbar />
      <Box
sx={{
  marginTop: 10,
  marginLeft: 10,
}}
      >
        <AddNewUser />
      </Box>
      <Box sx={{  }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 2,
            width: "80%", // Adjust the width to make the container smaller
            maxWidth: 1500, // Optional: set a maximum width
            margin: "0 auto", // Center the box horizontally
            height: "70%", // Optional: set the height
            maxHeight: 1000, // Optional: set the maximum height
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
            link="/complaints"
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

export default HomeAdmin;
