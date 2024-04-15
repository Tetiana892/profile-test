import "./App.css";
import React, { useState } from "react";
// import { FaAngleDown } from "react-icons/fa"; // Импорт иконки

function App() {
  return (
    <div className="App">
      <SmokingInput />
    </div>
  );
}

export default App;

const SmokingInput: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedCigarettes, setSelectedCigarettes] = useState<string[]>([]);
  const [selectedLimitation, setSelectedLimitation] = useState<string>("");

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
        selectedValue = "Виберіть хочаб один вид паління";
      }
      if (limitation) {
        selectedValue += ` ${limitation}`;
      }
    }
    setSelectedOption(selectedValue);
  };

  return (
    <div>
      <label>Паління</label>
      <div
        className="input-container"
        onClick={() => setShowOptions(!showOptions)}
      >
        <input type="text" value={selectedOption} readOnly />
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
    </div>
  );
};
