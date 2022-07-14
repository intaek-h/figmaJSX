import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import tools from "../../../constants/tools";
import {
  changeShapeColor,
  selectAllCanvas,
} from "../../../features/canvas/canvasSlice";
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
  const canvases = useSelector(selectAllCanvas);

  const [value, setValue] = useState(globalColor);

  useEffect(() => {
    if (
      selectedShapeIndexes.length === 1 &&
      canvases[workingCanvasIndex].children[selectedShapeIndexes[0]].type ===
        tools.TEXT
    ) {
      setValue(
        canvases[workingCanvasIndex].children[selectedShapeIndexes[0]].color
      );
    } else if (selectedShapeIndexes.length === 1) {
      setValue(
        canvases[workingCanvasIndex].children[selectedShapeIndexes[0]]
          .backgroundColor
      );
    }
  }, [canvases, selectedShapeIndexes, workingCanvasIndex]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (selectedShapeIndexes.length > 0) {
      selectedShapeIndexes.forEach((_, i) => {
        dispatch(
          changeShapeColor({
            canvasIndex: workingCanvasIndex,
            shapeIndex: selectedShapeIndexes[i],
            color: e.target.value,
          })
        );
      });
    }
  };

  const handleBlur = () => {
    dispatch(setGlobalColor(value));
    dispatch(setInputFieldBlurred());
  };

  return (
    <div className={styles["picker-wrapper"]}>
      <input
        type="color"
        className={styles.picker}
        data-testid="color-picker"
        value={value}
        onFocus={() => dispatch(setInputFieldFocused())}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span>{value}</span>
    </div>
  );
}

export default ColorPicker;
