import Navbar from "../components/NavBar";
import EvaluationList from "../components/EvaluationFormList";
import Box from "@mui/material/Box";
const Evaluation = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <EvaluationList />
      </Box>
    </>
  );
};

export default Evaluation;
