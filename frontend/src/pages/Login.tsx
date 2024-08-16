import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import guc from "../assets/guc.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typoOpen, setTypoOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("1111111111111111");
    event.preventDefault(); // Prevents the default form submission behavior
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    console.log("000000000000000000000000000000000");
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      console.log(result);
      sessionStorage.setItem("logged", "true");
      sessionStorage.setItem("role", result.role);
      sessionStorage.setItem("username", result.username);
      sessionStorage.setItem("id", result.id);
       console.log(result.token);
      if(!result.token || !result.role){
        navigate("/login"); 
        window.location.reload();
      }

      navigate("/home");
      window.location.reload();
    } else {
      setEmail("");
      setPassword("");
      setTypoOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            mb: 2,
          }}
          alt="guc"
          src={guc}
        />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {typoOpen && (
              <Typography sx={{ color: "red" }}>
                *Invalid username or password{" "}
              </Typography>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography
            component={Link}
            to="/EnterEmailReset"
            sx={{ textDecoration: "underline", color: "inherit" }}
          >
            Forgot your password?
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;