// Options.tsx
import React from "react";

interface OptionsProps {
  show: boolean;
  selectedOption: string;
  selectedCigarettes: string[];
  selectedLimitation: string;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLimitationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Options: React.FC<OptionsProps> = ({
  show,
  selectedOption,
  selectedCigarettes,
  selectedLimitation,
  onOptionChange,
  onCheckboxChange,
  onLimitationChange,
}) => {
  if (!show) return null;

  return (
    <div className="options-container">
      <label>
        <input
          type="radio"
          value="Палю"
          checked={selectedOption === "Палю"}
          onChange={onOptionChange}
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
              onChange={onCheckboxChange}
            />
            Цигарки
          </label>
          {/* Другие опции для выбора... */}
        </div>
      )}
      <label>
        <input
          type="radio"
          value="Не курящі"
          checked={selectedOption === "Не курящі"}
          onChange={onOptionChange}
        />
        Не палю
      </label>
    </div>
  );
};

export default Options;
