import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTextProperty } from "../../../features/canvas/canvasSlice";

import {
  selectGlobalFontSize,
  setGlobalFontSize,
} from "../../../features/globalStyles/globalStylesSlice";
import {
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
  setInputFieldBlurred,
  setInputFieldFocused,
} from "../../../features/utility/utilitySlice";
import styles from "./FontSizeInputField.module.scss";

function FontSizeInputField() {
  const dispatch = useDispatch();

  const globalFontSize = useSelector(selectGlobalFontSize);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);

  const [value, setValue] = useState(globalFontSize);

  return (
    <input
      type="number"
      className={styles.input}
      value={value}
      onFocus={() => dispatch(setInputFieldFocused())}
      onChange={(e) => {
        setValue(e.target.value);
        if (selectedShapeIndexes.length === 1) {
          dispatch(
            changeTextProperty({
              canvasIndex: workingCanvasIndex,
              shapeIndex: selectedShapeIndexes[0],
              fontSize: Number(e.target.value),
            })
          );
        }
      }}
      onKeyDown={(e) => {
        e.key === "Enter" && e.target.blur();
      }}
      onBlur={() => {
        dispatch(setGlobalFontSize(Number(value)));
        dispatch(setInputFieldBlurred());
      }}
    />
  );
}

export default FontSizeInputField;
