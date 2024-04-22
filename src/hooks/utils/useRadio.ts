import { useState } from "react";

const useRadio = () => {
  const [value, setValue] = useState<string>("");

  const handleRadioChange = (newValue: string) => {
    setValue(newValue);
  };

  return { value, handleRadioChange };
};

export default useRadio;
