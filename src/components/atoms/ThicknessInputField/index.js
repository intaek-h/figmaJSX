import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import tools from "../../../constants/tools";
import {
  changeLineThickness,
  selectAllCanvas,
} from "../../../features/canvas/canvasSlice";
import {
  selectGlobalThickness,
  setGlobalThickness,
} from "../../../features/globalStyles/globalStylesSlice";
import {
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
  setInputFieldBlurred,
  setInputFieldFocused,
} from "../../../features/utility/utilitySlice";
import styles from "./ThicknessInputField.module.scss";

function ThicknessInputField() {
  const dispatch = useDispatch();

  const globalThickness = useSelector(selectGlobalThickness);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);
  const canvases = useSelector(selectAllCanvas);

  const [value, setValue] = useState(globalThickness);

  useEffect(() => {
    if (
      selectedShapeIndexes.length === 1 &&
      canvases[workingCanvasIndex].children[selectedShapeIndexes[0]].type ===
        tools.LINE
    ) {
      const line =
        canvases[workingCanvasIndex].children[selectedShapeIndexes[0]];

      line.height > line.width ? setValue(line.width) : setValue(line.height);
    }
  }, [canvases, selectedShapeIndexes, workingCanvasIndex]);

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
            changeLineThickness({
              canvasIndex: workingCanvasIndex,
              shapeIndex: selectedShapeIndexes[0],
              thickness: Number(e.target.value),
            })
          );
        }
      }}
      onKeyDown={(e) => {
        e.key === "Enter" && e.target.blur();
      }}
      onBlur={() => {
        dispatch(setGlobalThickness(Number(value)));
        dispatch(setInputFieldBlurred());
      }}
    />
  );
}

export default ThicknessInputField;
