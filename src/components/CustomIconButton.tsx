import { FC } from "react";
import { IconButton, InputAdornment } from "@mui/material";

interface InputEndAdornmentProps {
  value: string;
  inputError?: string;
  handleClearInput: () => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  inputIcon: JSX.Element;
}

const CustomIconButton: FC<InputEndAdornmentProps> = ({
  value,
  inputError,
  handleClearInput,
  handleClick,
  inputIcon,
}) => {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={value || inputError ? handleClearInput : handleClick}
      >
        {inputIcon}
      </IconButton>
    </InputAdornment>
  );
};

export default CustomIconButton;
