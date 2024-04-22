import { FC } from "react";
import CustomCheckbox from "../CustomCheckbox";
import styles from "./SmokingInput.module.scss";

interface CheckboxGroupProps {
  selectedOptions: string[];
  handleCheckboxChange: (option: string) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  selectedOptions,
  handleCheckboxChange,
}) => {
  return (
    <div className={styles.wrapperCheckbox}>
      <CustomCheckbox
        option="Цигарки"
        checked={selectedOptions.includes("Цигарки")}
        onChange={() => handleCheckboxChange("Цигарки")}
      />
      <CustomCheckbox
        option="Вейп"
        checked={selectedOptions.includes("Вейп")}
        onChange={() => handleCheckboxChange("Вейп")}
      />
      <CustomCheckbox
        option="Тютюн"
        checked={selectedOptions.includes("Тютюн")}
        onChange={() => handleCheckboxChange("Тютюн")}
      />
      <CustomCheckbox
        option="IQOS"
        checked={selectedOptions.includes("IQOS")}
        onChange={() => handleCheckboxChange("IQOS")}
      />
    </div>
  );
};

export default CheckboxGroup;
