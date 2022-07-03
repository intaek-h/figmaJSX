import { useDispatch, useSelector } from "react-redux";

import {
  selectGlobalColor,
  setGlobalColor,
} from "../../../features/globalStyles/globalStylesSlice";
import styles from "./ColorPicker.module.scss";

function ColorPicker() {
  const dispatch = useDispatch();
  const globalColor = useSelector(selectGlobalColor);

  return (
    <div className={styles["picker-wrapper"]}>
      <input
        type="color"
        className={styles.picker}
        value={globalColor}
        onChange={(e) => {
          dispatch(setGlobalColor(e.target.value));
        }}
      />
      <span>{globalColor}</span>
    </div>
  );
}

export default ColorPicker;
