import FileLinksList from "../components/FileLinksList";
import FileLinkAdd from "../components/FileLinkAdd";
import Navbar from "../components/NavBar";
import { Box } from "@mui/material";

const FileLink = () => {
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
          <FileLinkAdd />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FileLinksList />
        </Box>
      </Box>
    </>
  );
};

export default FileLink;
