import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

const ResetPassword = () => {
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();

  const handleSubmit = async () => {
    const body = { otp: otp, email: email, newPassword: newPassword };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        navigate("/EnterEmailReset");
      }
    } catch (error) {
      console.log("err");
    }
  };

  return (
<Container maxWidth="sm">
  <Grid container justifyContent="center">
    <Grid item xs={12}>
      <Card sx={{ mt: 5, border: 1, borderColor: 'error.main', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            An OTP has been sent to your mail
          </Typography>
          <Box component="form">
            <TextField
              required
              fullWidth
              margin="normal"
              label="Enter the OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              InputProps={{ classes: { input: 'input-danger' } }}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              type="password"
              label="New password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{ classes: { input: 'input-danger' } }}
            />
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
              onClick={handleSubmit}
            >
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Container>
  );
};

export default ResetPassword;
