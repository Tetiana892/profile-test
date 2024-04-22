import React, { FC } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

interface CheckboxProps {
  option: string;
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: FC<CheckboxProps> = ({ option, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          sx={{
            "&.Mui-checked": {
              color: "#259ac2",
            },
          }}
        />
      }
      label={option}
    />
  );
};
export default CustomCheckbox;
