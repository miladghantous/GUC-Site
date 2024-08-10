import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { searchBySubject , getAllFileLinks} from "../api/FileLinkApi";
import { FileLinkResponse } from "../type";

interface SearchBarProps {
  onData: (data: FileLinkResponse[]) => void;
}
function SearchBar({ onData }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  const handleSearch = async () => {
    if (!search.trim()) return; // Avoid searching if the input is empty
    try {
      const response = await searchBySubject(search);
      onData(response);
      console.log("FileLink searched:", response);
    } catch (error) {
      console.error("Failed to search filelink:", error);
    }
  };

  const handleClear = () => {
    setSearch("");
    getAllFileLinks().then((response) => {
      onData(response);
    } );
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon onClick={handleSearch} style={{ cursor: "pointer" }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
              <ClearIcon onClick={handleClear} style={{ cursor: "pointer" }} />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
