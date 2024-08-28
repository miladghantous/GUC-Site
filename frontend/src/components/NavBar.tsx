import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

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
  const navigate = useNavigate();

  const role = sessionStorage.getItem("role");
  const isAdmin = role === "ADMIN";
  const isInstructor = role === "INSTRUCTOR";

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
        <Link to={"/home"}>
          <Box
            component="img"
            src={logo}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: "50px" }}
          />
        </Link>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignContent: "center",
            marginLeft: 40,
          }}
        >
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
          {isAdmin ? (
            <Box
              component={Link}
              to="/evaluationsAdmin"
              sx={{ textDecoration: "none" }}
            >
              <StyledMenuItem>Evaluations</StyledMenuItem>
            </Box>
          ) : (
            <Box
              component={Link}
              to="/evaluationsInstructor"
              sx={{ textDecoration: "none" }}
            >
              <StyledMenuItem>Evaluations</StyledMenuItem>
            </Box>
          )}
          <Box component={Link} to="/filelinks" sx={{ textDecoration: "none" }}>
            <StyledMenuItem>Links</StyledMenuItem>
          </Box>
          <Box component={Link} to="/funds" sx={{ textDecoration: "none" }}>
            <StyledMenuItem>Funds</StyledMenuItem>
          </Box>
          {isAdmin ? (
            <Box
              component={Link}
              to="/complaintsAdmin"
              sx={{ textDecoration: "none" }}
            >
              <StyledMenuItem>Complaints</StyledMenuItem>
            </Box>
          ) : (
            <Box
              component={Link}
              to="/complaintsInstructor"
              sx={{ textDecoration: "none" }}
            >
              <StyledMenuItem>Complaints</StyledMenuItem>
            </Box>
          )}
          {/* code for logout icon */}
          <Box
            sx={{
              marginLeft: 40,
            }}
          >
            <IconButton onClick={handleLogout}>
              <LogoutIcon
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#F57C00", // Change background color on hover
                    boxShadow: 6, // Increase shadow on hover
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;