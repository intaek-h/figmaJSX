import { useDispatch, useSelector } from "react-redux";
import { changeShapeColor } from "../../../features/canvas/canvasSlice";

import {
  selectGlobalColor,
  setGlobalColor,
} from "../../../features/globalStyles/globalStylesSlice";
import {
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
  setInputFieldBlurred,
  setInputFieldFocused,
} from "../../../features/utility/utilitySlice";
import styles from "./ColorPicker.module.scss";

function ColorPicker() {
  const dispatch = useDispatch();

  const globalColor = useSelector(selectGlobalColor);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);

  return (
    <div className={styles["picker-wrapper"]}>
      <input
        type="color"
        className={styles.picker}
        value={globalColor}
        onFocus={() => dispatch(setInputFieldFocused())}
        onChange={(e) => {
          if (selectedShapeIndexes.length === 1) {
            dispatch(
              changeShapeColor({
                canvasIndex: workingCanvasIndex,
                shapeIndex: selectedShapeIndexes[0],
                color: e.target.value,
              })
            );
          }
          dispatch(setGlobalColor(e.target.value));
        }}
        onBlur={() => dispatch(setInputFieldBlurred())}
      />
      <span>{globalColor}</span>
    </div>
  );
}

export default ColorPicker;
