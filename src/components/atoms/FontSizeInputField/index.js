import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGlobalFontSize,
  setGlobalFontSize,
} from "../../../features/globalStyles/globalStylesSlice";
import styles from "./FontSizeInputField.module.scss";

function FontSizeInputField() {
  const dispatch = useDispatch();
  const globalFontSize = useSelector(selectGlobalFontSize);

  const [value, setValue] = useState(globalFontSize);

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
        dispatch(setGlobalFontSize(Number(value)));
      }}
    />
  );
}

export default FontSizeInputField;
