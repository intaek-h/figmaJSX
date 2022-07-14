import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import tools from "../../../constants/tools";
import {
  changeTextProperty,
  selectAllCanvas,
} from "../../../features/canvas/canvasSlice";
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
  const canvases = useSelector(selectAllCanvas);

  const [value, setValue] = useState(globalFontSize);

  const handleChange = (e) => {
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
  };

  const handleBlur = () => {
    dispatch(setGlobalFontSize(Number(value)));
    dispatch(setInputFieldBlurred());
  };

  useEffect(() => {
    if (
      selectedShapeIndexes.length === 1 &&
      canvases[workingCanvasIndex].children[selectedShapeIndexes[0]].type ===
        tools.TEXT
    ) {
      setValue(
        canvases[workingCanvasIndex].children[
          selectedShapeIndexes[0]
        ].fontSize.toString()
      );
    }
  }, [canvases, selectedShapeIndexes, workingCanvasIndex]);

  return (
    <input
      type="number"
      data-testid="font-size-input"
      className={styles.input}
      value={value}
      onFocus={() => dispatch(setInputFieldFocused())}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        e.key === "Enter" && e.target.blur();
      }}
    />
  );
}

export default FontSizeInputField;
