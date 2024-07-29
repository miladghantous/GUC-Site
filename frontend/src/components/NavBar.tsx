import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import logo from "../assets/logo.png";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#1c0b0b",
});

const StyledMenuItem = styled(MenuItem)({
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

const Navbar = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        {/* Add logo here from the assets folder */}
        <Box
          component="img"
          src={logo}
          sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: "40px" }}
        />
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <StyledMenuItem>Home</StyledMenuItem>
          <StyledMenuItem>Announcements</StyledMenuItem>
          <StyledMenuItem>Conferences</StyledMenuItem>
          <StyledMenuItem>Evaluation</StyledMenuItem>
          <StyledMenuItem>Files</StyledMenuItem>
          <StyledMenuItem>Funds</StyledMenuItem>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
