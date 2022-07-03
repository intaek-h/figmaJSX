import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGlobalThickness,
  setGlobalThickness,
} from "../../../features/globalStyles/globalStylesSlice";
import styles from "./ThicknessInputField.module.scss";

function ThicknessInputField() {
  const dispatch = useDispatch();
  const globalThickness = useSelector(selectGlobalThickness);

  const [value, setValue] = useState(globalThickness);

  return (
    <input
      type="number"
      className={styles.input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        e.key === "Enter" && e.target.blur();
      }}
      onBlur={() => {
        dispatch(setGlobalThickness(Number(value)));
      }}
    />
  );
}

export default ThicknessInputField;
