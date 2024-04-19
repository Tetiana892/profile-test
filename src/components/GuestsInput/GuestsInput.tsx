import {
  FormControlLabel,
  InputBase,
  Popover,
  RadioGroup,
  Typography,
  Radio,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { FC, useState } from "react";
import styles from "../SmokingInput/SmokingInput.module.scss";

const GuestsInput: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<string>("");
  const [inputIcon, setInputIcon] = useState<JSX.Element>(
    <KeyboardArrowDownIcon />
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsFocused(true);
    if (!value) {
      setInputIcon(<KeyboardArrowDownIcon />);
    } else {
      setInputIcon(<CloseIcon />);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    setValue(selectedValue);
    setInputIcon(<CloseIcon />);
    handleClose();
  };

  const handleClearInput = () => {
    setValue("");
    setInputIcon(<KeyboardArrowDownIcon />);
  };

  return (
    <div className={styles.containerGuests}>
      <Typography variant="body1" gutterBottom>
        Гості
      </Typography>
      <InputBase
        type="text"
        className={`${styles.inputBase} ${
          isFocused && !value ? styles.focused : ""
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={value ? handleClearInput : handleClick}>
              {inputIcon}
            </IconButton>
          </InputAdornment>
        }
      />
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          top: "45px",
          left: "-340px",
        }}
      >
        <RadioGroup
          value={value}
          onChange={handleChange}
          sx={{ width: "360px", paddingLeft: "20px" }}
        >
          <FormControlLabel
            value="Часто"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#259ac2",
                  },
                }}
              />
            }
            label="Часто"
          />
          <FormControlLabel
            value="Рідко"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#259ac2",
                  },
                }}
              />
            }
            label="Рідко"
          />
          <FormControlLabel
            value="Не приводжу"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#259ac2",
                  },
                }}
              />
            }
            label="Не приводжу"
          />
        </RadioGroup>
      </Popover>
    </div>
  );
};

export default GuestsInput;
