import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#1c0b0b",
});

const StyledMenuItem = styled(MenuItem)({
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#F57C00",
  },
});

const Navbar = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Link to={"/home"}>
        <Box
          component="img"
          src={logo}
          sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: "50px" }}
          />
          </Link>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <Box component={Link} to="/home" sx={{ textDecoration: "none" }}>
            <StyledMenuItem>Home</StyledMenuItem>
          </Box>
          <Box
            component={Link}
            to="/announcements"
            sx={{ textDecoration: "none" }}
          >
            <StyledMenuItem>Announcements</StyledMenuItem>
          </Box>
          <Box
            component={Link}
            to="/conferences"
            sx={{ textDecoration: "none" }}
          >
            <StyledMenuItem>Conferences</StyledMenuItem>
          </Box>
          <Box
            component={Link}
            to="/evaluations"
            sx={{ textDecoration: "none" }}
          >
            <StyledMenuItem>Evaluation</StyledMenuItem>
          </Box>
          <Box component={Link} to="/filelinks" sx={{ textDecoration: "none" }}>
            <StyledMenuItem>Files</StyledMenuItem>
          </Box>
          <Box component={Link} to="/funds" sx={{ textDecoration: "none" }}>
            <StyledMenuItem>Funds</StyledMenuItem>
          </Box>
          <Box
            component={Link}
            to="/complaints"
            sx={{ textDecoration: "none" }}
          >
            <StyledMenuItem>Complaints</StyledMenuItem>
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
