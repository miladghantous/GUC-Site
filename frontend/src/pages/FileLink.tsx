import { useState } from "react";
import FileLinksList from "../components/FileLinksList";
import FileLinkAdd from "../components/FileLinkAdd";
import Navbar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { FileLinkResponse } from "../type";
import { getAllFileLinks } from "../api/FileLinkApi";

const FileLink = () => {
  const [data, setData] = useState<FileLinkResponse[]>([]);

  const handleData = (receivedData: FileLinkResponse[]) => {
    setData(receivedData);
  };

  useEffect(() => {
    getAllFileLinks().then((response) => {
      setData(response);
    });
  }, []);

  const handleEditOrDelete = () => {
    getAllFileLinks().then((response) => {
      setData(response);
    });
    console.log("FileLink edited or deleted");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ paddingTop: 8 }}>
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: 6,
            marginLeft: 4,
          }}
        >
          <FileLinkAdd onAdd={handleEditOrDelete} />
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              marginTop: -4,
              marginLeft: 20,
            }}
          >
            <SearchBar onData={handleData} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FileLinksList data={data} onEditOrDelete={handleEditOrDelete} />
        </Box>
      </Box>
    </>
  );
};

export default FileLink;
