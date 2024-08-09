import React, { FunctionComponent, useState } from "react";
import {
  FormControl,
  InputAdornment,
  TextField,
  createStyles,
  makeStyles
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const useStyles = makeStyles(() => {
  return createStyles({
    search: {
      margin: "0"
    }
  });
});

const TypeSearch: FunctionComponent = () => {
  const { search } = useStyles();

  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const handleClick = (): void => {
    const inputElement = document.querySelector("#app input");
    if (inputElement instanceof HTMLInputElement) {
      inputElement.value = "";
      setShowClearIcon("none");
    }
    console.log("clicked the clear icon...");
  };

  return (
    <div id="app">
      <FormControl className={search}>
        <TextField
          size="small"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleClick}
              >
                <ClearIcon />
              </InputAdornment>
            )
          }}
        />
      </FormControl>
    </div>
  );
};

export default TypeSearch;
