import Navbar from "../components/NavBar";
import Box from "@mui/material/Box";
import EvaluationFormsListAdmin from "../components/EvaluationFormListAdmin";
const EvaluationInstructor = () => {
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EvaluationFormsListAdmin />
        </Box>
      </Box>
    </>
  );
};

export default EvaluationInstructor;
