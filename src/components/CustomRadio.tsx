import { FC } from "react";
import { Radio } from "@mui/material";

interface RadioProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomRadio: FC<RadioProps> = ({ value, onChange }) => {
  return (
    <Radio
      sx={{
        "&.Mui-checked": {
          color: "#259ac2",
        },
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
export default CustomRadio;
