import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  modifyShape,
  selectAllCanvas,
} from "../../../features/canvas/canvasSlice";
import {
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
  setInputFieldFocused,
  setInputFieldBlurred,
} from "../../../features/utility/utilitySlice";
import translateFigure from "../../../utilities/translateFigure";
import styles from "./FigureInput.module.scss";

function FigureInput({ figure }) {
  const dispatch = useDispatch();

  const canvases = useSelector(selectAllCanvas);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);

  const style = translateFigure(figure);
  const isSingleShapeSelected = selectedShapeIndexes.length === 1;

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isSingleShapeSelected) {
      return setValue(0);
    }

    const defaultValue =
      canvases[workingCanvasIndex].children[selectedShapeIndexes[0]];

    setValue(Math.floor(defaultValue[style]));
  }, [
    canvases,
    isSingleShapeSelected,
    selectedShapeIndexes,
    style,
    workingCanvasIndex,
  ]);

  if (!isSingleShapeSelected)
    return (
      <div className={styles.wrapper}>
        <label htmlFor={figure} className={styles.label}>
          {figure}
        </label>
        <input
          type="number"
          name={figure}
          className={styles.disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled
        />
      </div>
    );

  return (
    <div className={styles.wrapper}>
      <label htmlFor={figure} className={styles.label}>
        {figure}
      </label>
      <input
        type="number"
        name={figure}
        className={styles.input}
        value={value}
        onFocus={() => dispatch(setInputFieldFocused())}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && e.target.blur();
        }}
        onBlur={() => {
          dispatch(setInputFieldBlurred());
          dispatch(
            modifyShape({
              [style]: Number(value),
              canvasIndex: workingCanvasIndex,
              shapeIndex: selectedShapeIndexes[0],
            })
          );
        }}
      />
    </div>
  );
}

export default FigureInput;
