import { FC, useState } from "react";
import {
  FormControlLabel,
  InputBase,
  Popover,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./SmokingInput.module.scss";

import CustomRadio from "../CustomRadio";
import ReadyToLimit from "./ReadyToLimit";
import CheckboxGroup from "./CheckboxGroup";
import CustomIconButton from "../CustomIconButton";

const SmokingInput: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<string>("");
  const [inputIcon, setInputIcon] = useState<JSX.Element>(
    <KeyboardArrowDownIcon />
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [inputError, setInputError] = useState<string>("");
  const [radioValue, setRadioValue] = useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsFocused(true);
    if (!value) {
      setInputIcon(<KeyboardArrowDownIcon />);
    } else {
      setInputIcon(<CloseIcon />);
    }
  };

  const handleOptionClick = (option: string) => {
    if (option === "Палю") {
      const alreadySelectedOptions = selectedOptions.join(", ");
      setValue(
        alreadySelectedOptions ? "Палю, " + alreadySelectedOptions : "Палю"
      );
      setInputError("");
    }

    setValue(option);

    if (option !== "Палю") {
      setAnchorEl(null);
      setInputError("");
      setInputIcon(<CloseIcon />);
      setRadioValue(option);
    } else {
      setInputIcon(<CloseIcon />);
    }
  };

  const handleClearInput = () => {
    setValue("");
    setInputIcon(<KeyboardArrowDownIcon />);
    setInputError("");
    setSelectedOptions([]);
    setRadioValue("");
  };

  const updateOptionsAndValue = (updatedOptions: string[]) => {
    setSelectedOptions(updatedOptions);
    const newValue =
      updatedOptions.length > 0 ? "Палю, " + updatedOptions.join(", ") : "";
    setValue(newValue);

    if (radioValue !== "" && updatedOptions.length > 0) {
      setValue(newValue + `, ${radioValue}`);
    }
    setInputError(
      updatedOptions.length === 0 ? "Виберіть хоча б один вид паління" : ""
    );
  };

  const handleCheckboxChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    updateOptionsAndValue(updatedOptions);
  };

  const handleRadioChange = (value: string) => {
    if (
      value === "Ні" ||
      value === "Тільки на балконі" ||
      value === "Не в квартирі"
    ) {
      if (selectedOptions.length === 0) {
        setInputError("Виберіть хоча б один вид паління");
      } else {
        setInputError("");
      }
    }

    const newValue =
      selectedOptions.length > 0
        ? "Палю, " + selectedOptions.join(", ") + `, ${value}`
        : value;
    setValue(newValue);
    setRadioValue(value);

    setAnchorEl(null);
    setIsFocused(false);
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
            (inputError && styles.focused) ||
            (value && isFocused && styles.focused)
          }`}
          style={{ color: inputError ? "red" : "inherit" }}
          value={inputError || value}
          onChange={(e) => setValue(e.target.value)}
          endAdornment={
            <CustomIconButton
              value={value}
              inputError={inputError}
              handleClearInput={handleClearInput}
              handleClick={handleClick}
              inputIcon={inputIcon}
            />
          }
        />
      </div>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
          setIsFocused(false);
        }}
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
          <div>
            <FormControlLabel
              value="Палю"
              control={
                <CustomRadio value="Палю" onChange={handleOptionClick} />
              }
              label="Палю"
            />
            {value === "Палю" && (
              <div style={{ paddingLeft: "20px" }}>
                <CheckboxGroup
                  selectedOptions={selectedOptions}
                  handleCheckboxChange={handleCheckboxChange}
                />
                <ReadyToLimit
                  selectedOptions={selectedOptions}
                  radioValue={radioValue}
                  handleRadioChange={handleRadioChange}
                />
              </div>
            )}
          </div>
          <FormControlLabel
            value="Не курящі"
            control={
              <CustomRadio value="Не курящі" onChange={handleOptionClick} />
            }
            label="Не палю"
          />
        </RadioGroup>
      </Popover>
    </div>
  );
};

export default SmokingInput;
