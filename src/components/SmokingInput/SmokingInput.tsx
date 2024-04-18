import { FC, useState } from "react";
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputBase,
  Popover,
  Radio,
  RadioGroup,
  Checkbox,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./SmokingInput.module.scss";

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
      setSelectedOptions([]);
      setRadioValue("");
    }

    setValue(option);

    if (option !== "Палю") {
      setAnchorEl(null);
      setInputError("");
      setInputIcon(<CloseIcon />);
      setRadioValue(option);
    } else {
      setInputError("Виберіть хоча б один вид паління");
      setInputIcon(<CloseIcon />);
    }

    if (["Ні", "Тільки на балконі", "Не в квартирі"].includes(option)) {
      setAnchorEl(null);
    }
  };

  const handleClearInput = () => {
    setValue("");
    setInputIcon(<KeyboardArrowDownIcon />);
    setInputError("");
  };

  const handleCheckboxChange = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    let updatedOptions: string[];

    if (isSelected) {
      updatedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);

    let newValue =
      updatedOptions.length > 0 ? "Палю, " + updatedOptions.join(", ") : "";
    setValue(newValue);

    if (updatedOptions.length === 0) {
      setInputError("Виберіть хоча б один вид паління");
    } else {
      setInputError("");
    }

    let newRadioValue = radioValue;

    if (radioValue !== "" && updatedOptions.length > 0) {
      newValue += `, ${newRadioValue}`;
      setValue(newValue);
    }
  };

  const handleRadioChange = (value: string) => {
    setRadioValue(value);
    if (selectedOptions.length > 0 && value !== "") {
      setAnchorEl(null);
    }
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
            (!value && isFocused) || inputError ? styles.focused : ""
          }`}
          style={{ color: inputError ? "red" : "inherit" }}
          value={inputError || value}
          onChange={(e) => setValue(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={value || inputError ? handleClearInput : handleClick}
              >
                {inputIcon}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          if (radioValue) {
            setAnchorEl(null);
            setIsFocused(false);
          }
        }}
        sx={{
          top: "45px",
          left: "-334px",
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
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#259ac2",
                    },
                  }}
                />
              }
              label="Палю"
            />
            {value === "Палю" && (
              <div style={{ paddingLeft: "20px" }}>
                <div className={styles.wrapperChackbox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedOptions.includes("Цигарки")}
                        onChange={() => handleCheckboxChange("Цигарки")}
                        sx={{
                          "&.Mui-checked": {
                            color: "#259ac2",
                          },
                        }}
                      />
                    }
                    label="Цигарки"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedOptions.includes("Вейп")}
                        onChange={() => handleCheckboxChange("Вейп")}
                        sx={{
                          "&.Mui-checked": {
                            color: "#259ac2",
                          },
                        }}
                      />
                    }
                    label="Вейп"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedOptions.includes("Тютюн")}
                        onChange={() => handleCheckboxChange("Тютюн")}
                        sx={{
                          "&.Mui-checked": {
                            color: "#259ac2",
                          },
                        }}
                      />
                    }
                    label="Тютюн"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedOptions.includes("IQOS")}
                        onChange={() => handleCheckboxChange("IQOS")}
                        sx={{
                          "&.Mui-checked": {
                            color: "#259ac2",
                          },
                        }}
                      />
                    }
                    label="IQOS"
                  />
                </div>
                <div className={styles.wrapperRadioGroup}>
                  <Typography variant="body1" gutterBottom>
                    Готовий обмежетись?
                  </Typography>
                  <RadioGroup
                    value={radioValue}
                    onChange={(e) => handleRadioChange(e.target.value)}
                  >
                    <FormControlLabel
                      value="Ні"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#259ac2",
                            },
                          }}
                        />
                      }
                      label="Ні"
                    />
                    <FormControlLabel
                      value="Тільки на балконі"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#259ac2",
                            },
                          }}
                        />
                      }
                      label="Тільки на балконі"
                    />
                    <FormControlLabel
                      value="Не в квартирі"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#259ac2",
                            },
                          }}
                        />
                      }
                      label="Не в квартирі"
                    />
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>
          <FormControlLabel
            value="Не курящі"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#259ac2",
                  },
                }}
              />
            }
            label="Не палю"
          />
        </RadioGroup>
      </Popover>
    </div>
  );
};

export default SmokingInput;
