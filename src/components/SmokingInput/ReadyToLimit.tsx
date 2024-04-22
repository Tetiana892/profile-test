import { FC } from "react";
import { FormControlLabel, RadioGroup, Typography } from "@mui/material";
import CustomRadio from "../CustomRadio";
import styles from "./SmokingInput.module.scss";

interface ReadyToLimitProps {
  selectedOptions: string[];
  radioValue: string;
  handleRadioChange: (value: string) => void;
}

const ReadyToLimit: FC<ReadyToLimitProps> = ({
  selectedOptions,
  radioValue,
  handleRadioChange,
}) => {
  return (
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
          control={<CustomRadio value="Ні" onChange={handleRadioChange} />}
          label="Ні"
        />
        <FormControlLabel
          value="Тільки на балконі"
          control={
            <CustomRadio
              value="Тільки на балконі"
              onChange={handleRadioChange}
            />
          }
          label="Тільки на балконі"
        />
        <FormControlLabel
          value="Не в квартирі"
          control={
            <CustomRadio value="Не в квартирі" onChange={handleRadioChange} />
          }
          label="Не в квартирі"
        />
      </RadioGroup>
    </div>
  );
};

export default ReadyToLimit;
