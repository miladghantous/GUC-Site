import Navbar from "../components/NavBar";
import EvaluationList from "../components/EvaluationFormList";
import EvaluationFormAdd from "../components/EvaluationFormAdd";
import Box from "@mui/material/Box";
const Evaluation = () => {
  return (
    <>
    <Navbar />
    <Box
      sx={{
        paddingTop: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginTop: 6,
          marginLeft: 4,
        }}
      >
        <EvaluationFormAdd />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EvaluationList />
      </Box>
    </Box>
  </>
  );
};

export default Evaluation;
