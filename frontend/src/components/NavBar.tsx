import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
// import logo from "../assets/logo.png";
import logo2 from "../assets/German_University_in_Cairo_Logo2.png";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Typography } from "@mui/material";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#216DAB",
});

const StyledMenuItem = styled(MenuItem)({
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#ea6e15",
  },
});

const ActiveMenuItem = styled(StyledMenuItem)({
  // color: "#F57C00", // Change color when active
  backgroundColor: "#ea6e15",
});

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("username");
  const isAdmin = role === "ADMIN";
  // const isInstructor = role === "INSTRUCTOR";

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const message = await response.json();
        console.log(message);
      } else {
      }
    } catch (error) {
      console.log("errr");
    }
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    navigate("/login");
    window.location.reload();
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Link to="/home">
          <Box
            component="img"
            src={logo2}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: "50px" }}
          />
        </Link>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignContent: "center",
            marginLeft: 10,
          }}
        >
          <Box component={Link} to="/home" sx={{ textDecoration: "none" }}>
            {location.pathname === "/home" ? (
              <ActiveMenuItem>Home</ActiveMenuItem>
            ) : (
              <StyledMenuItem>Home</StyledMenuItem>
            )}
          </Box>
          <Box
            component={Link}
            to="/announcements"
            sx={{ textDecoration: "none" }}
          >
            {location.pathname === "/announcements" ? (
              <ActiveMenuItem>Announcements</ActiveMenuItem>
            ) : (
              <StyledMenuItem>Announcements</StyledMenuItem>
            )}
          </Box>
          <Box
            component={Link}
            to="/conferences"
            sx={{ textDecoration: "none" }}
          >
            {location.pathname === "/conferences" ? (
              <ActiveMenuItem>Conferences</ActiveMenuItem>
            ) : (
              <StyledMenuItem>Conferences</StyledMenuItem>
            )}
          </Box>
          {isAdmin ? (
            <Box
              component={Link}
              to="/evaluationsAdmin"
              sx={{ textDecoration: "none" }}
            >
              {location.pathname === "/evaluationsAdmin" ? (
                <ActiveMenuItem>Evaluations</ActiveMenuItem>
              ) : (
                <StyledMenuItem>Evaluations</StyledMenuItem>
              )}
            </Box>
          ) : (
            <Box
              component={Link}
              to="/evaluationsInstructor"
              sx={{ textDecoration: "none" }}
            >
              {location.pathname === "/evaluationsInstructor" ? (
                <ActiveMenuItem>Evaluations</ActiveMenuItem>
              ) : (
                <StyledMenuItem>Evaluations</StyledMenuItem>
              )}
            </Box>
          )}
          <Box component={Link} to="/filelinks" sx={{ textDecoration: "none" }}>
            {location.pathname === "/filelinks" ? (
              <ActiveMenuItem>Links</ActiveMenuItem>
            ) : (
              <StyledMenuItem>Links</StyledMenuItem>
            )}
          </Box>
          <Box component={Link} to="/funds" sx={{ textDecoration: "none" }}>
            {location.pathname === "/funds" ? (
              <ActiveMenuItem>Funds</ActiveMenuItem>
            ) : (
              <StyledMenuItem>Funds</StyledMenuItem>
            )}
          </Box>
          {isAdmin ? (
            <Box
              component={Link}
              to="/complaintsAdmin"
              sx={{ textDecoration: "none" }}
            >
              {location.pathname === "/complaintsAdmin" ? (
                <ActiveMenuItem>Complaints</ActiveMenuItem>
              ) : (
                <StyledMenuItem>Complaints</StyledMenuItem>
              )}
            </Box>
          ) : (
            <Box
              component={Link}
              to="/complaintsInstructor"
              sx={{ textDecoration: "none" }}
            >
              {location.pathname === "/complaintsInstructor" ? (
                <ActiveMenuItem>Complaints</ActiveMenuItem>
              ) : (
                <StyledMenuItem>Complaints</StyledMenuItem>
              )}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            ml: 5,
            mr: 5,
          }}
        >
          <Typography>Hello, {username}</Typography>
        </Box>
        {/* Logout Icon */}
        <Box
          sx={{
            marginLeft: 10,
          }}
        >
          <IconButton onClick={handleLogout}>
            <LogoutIcon
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "#F57C00",
                  boxShadow: 6,
                },
              }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
