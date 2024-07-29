import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ mt: 8 }}>{/* Other components or main content */}</Box>
      <Home />
    </div>
  );
};

export default App;
