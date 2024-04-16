import { useState, FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import InputButton from "./InputButton";

const SmokingInput: FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedCigarettes, setSelectedCigarettes] = useState<string[]>([]);
  const [selectedLimitation, setSelectedLimitation] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedOption(value);

    if (value === "Палю") {
      setShowOptions(true); // показуємо список опцій при виборі опції "Палю"
    } else if (value === "Не палю") {
      setShowOptions(false); // при виборі іншої опції скриваємо
      setSelectedCigarettes([]); // скидаємо обрані опції при виборі "Не палю"
      setSelectedLimitation(""); // скидаємо обрані радіобатони при виборі "Не палю"
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedCigarettes = checked
      ? [...selectedCigarettes, value]
      : selectedCigarettes.filter((item) => item !== value);
    setSelectedCigarettes(updatedCigarettes);
    updateSelectedOption(selectedOption, updatedCigarettes, selectedLimitation);
  };

  const handleLimitationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSelectedLimitation(value);
    updateSelectedOption(selectedOption, selectedCigarettes, value);
  };

  const updateSelectedOption = (
    option: string,
    cigarettes: string[],
    limitation: string
  ) => {
    let selectedValue = option;

    if (option === "Палю") {
      if (cigarettes.length > 0) {
        selectedValue += ` ${cigarettes.join(", ")}`;
      } else {
        selectedValue = "Виберіть хоча б один вид паління";
      }
      if (limitation) {
        selectedValue += ` ${limitation}`;
      }
    }
    setSelectedOption(selectedValue);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    setShowOptions(!!value);
  };

  const handleClearInput = () => {
    setInputValue("");
    setSelectedOption("");
    setSelectedCigarettes([]);
    setSelectedLimitation("");
  };

  const isInputEmpty = inputValue === "";

  return (
    <div>
      <label>Паління</label>
      <div
        className={`input-conteiner ${isFocused ? "focused" : ""}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <InputBase
          type="text"
          value={inputValue || selectedOption}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          readOnly={!isInputEmpty}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={
                  isInputEmpty
                    ? () => setShowOptions(!showOptions)
                    : handleClearInput
                }
              >
                {isInputEmpty ? <KeyboardArrowDownIcon /> : <CloseIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      {showOptions && (
        <div className="options-container">
          <label>
            <input
              type="radio"
              value="Палю"
              checked={selectedOption === "Палю"}
              onChange={handleOptionChange}
            />
            Палю
          </label>
          {selectedOption === "Палю" && (
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Цигарки"
                  checked={selectedCigarettes.includes("Цигарки")}
                  onChange={handleCheckboxChange}
                />
                Цигарки
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Вейп"
                  checked={selectedCigarettes.includes("Вейп")}
                  onChange={handleCheckboxChange}
                />
                Вейп
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Тютюн"
                  checked={selectedCigarettes.includes("Тютюн")}
                  onChange={handleCheckboxChange}
                />
                Тютюн
              </label>
              <label>
                <input
                  type="checkbox"
                  value="IQOS"
                  checked={selectedCigarettes.includes("IQOS")}
                  onChange={handleCheckboxChange}
                />
                IQOS
              </label>
              <p>Готовий обмежетись?</p>
              <label>
                <input
                  type="radio"
                  value="Ні"
                  checked={selectedLimitation === "Ні"}
                  onChange={handleLimitationChange}
                />
                Ні
              </label>
              <label>
                <input
                  type="radio"
                  value="Тільки на балконі"
                  checked={selectedLimitation === "Тільки на балконі"}
                  onChange={handleLimitationChange}
                />
                Тільки на балконі
              </label>
              <label>
                <input
                  type="radio"
                  value="Не в квартирі"
                  checked={selectedLimitation === "Не в квартирі"}
                  onChange={handleLimitationChange}
                />
                Не в квартирі
              </label>
            </div>
          )}
          <label>
            <input
              type="radio"
              value="Не курящі"
              checked={selectedOption === "Не курящі"}
              onChange={handleOptionChange}
            />
            Не палю
          </label>
        </div>
      )}
      <InputButton />
    </div>
  );
};

export default SmokingInput;
