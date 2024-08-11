import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Card, CardContent } from "@mui/material";


const EnterEmailReset = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/generateOTP`,{email:email})
            if(response.status == 200){
                navigate(`/ResetPassword/${email}`)
            }
        }
        catch (error){

        }

    };

    return (
<Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ border: "1px solid ", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" color="black" gutterBottom>
            Send OTP to your Email
          </Typography>
          <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <Box mb={2}>
              <TextField
                fullWidth
                required
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ style: { fontSize: 16 } }}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color= "primary"
              sx={{ mt: 2 }}
            >
              Send OTP
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
    );
};

export default EnterEmailReset;