import { useState } from "react";

const useCheckbox = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return { checked, handleCheckboxChange };
};

export default useCheckbox;
