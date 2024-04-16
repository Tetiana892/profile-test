import React, { useState } from "react";
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputBase,
  Popover,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./InputButton.module.scss"; // Импорт стилей

const InputButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<string>("");
  const [inputIcon, setInputIcon] = useState<JSX.Element>(
    <KeyboardArrowDownIcon />
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsFocused(true); // Устанавливаем isFocused в true, когда меню открывается
    if (!value) {
      setInputIcon(<KeyboardArrowDownIcon />);
    } else {
      setInputIcon(<CloseIcon />);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsFocused(false); // Сбрасываем isFocused в false при закрытии меню
  };

  const handleOptionClick = (option: string) => {
    setValue(option);
    setAnchorEl(null);
    setInputIcon(<CloseIcon />);
  };

  const handleClearInput = () => {
    setValue("");
    setInputIcon(<KeyboardArrowDownIcon />);
  };

  return (
    <div className={styles.container}>
      <Typography variant="body1" gutterBottom>
        Паління
      </Typography>
      <div>
        <InputBase
          type="text"
          className={`${styles.inputBase} ${
            value && isFocused ? styles.focused : ""
          }`}
          style={{ paddingLeft: "20px" }}
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
      </div>

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
          onChange={(e) => handleOptionClick(e.target.value)}
          sx={{ width: "360px", paddingLeft: "20px" }}
        >
          <FormControlLabel value="Палю" control={<Radio />} label="Палю" />
          <FormControlLabel
            value="Не палю"
            control={<Radio />}
            label="Не палю"
          />
        </RadioGroup>
      </Popover>
    </div>
  );
};

export default InputButton;
