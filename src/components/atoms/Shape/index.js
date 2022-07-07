import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHAPE_STYLES } from "../../../constants/styles";

import {
  activateSelector,
  deactivateSelector,
  replaceSelectedShapeIndexes,
  selectCurrentWorkingCanvasIndex,
  selectHoveredShape,
  setHoveredShape,
  setWorkingCanvasIndex,
} from "../../../features/utility/utilitySlice";
import useDragShape from "../../../hooks/useDragShape";
import styles from "./Shape.module.scss";

function Shape({ canvasRef, currentCanvasIndex, currentShapeIndex, ...shape }) {
  const dispatch = useDispatch();

  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const { canvasIndex, shapeIndex } = useSelector(selectHoveredShape);

  const shapeRef = useRef();

  const [isMouseHovered, setIsMouseHovered] = useState(false);

  useDragShape(shapeRef, canvasRef, currentCanvasIndex, currentShapeIndex);

  useEffect(() => {
    if (
      canvasIndex === currentCanvasIndex &&
      shapeIndex === currentShapeIndex
    ) {
      return setIsMouseHovered(true);
    }

    setIsMouseHovered(false);
  }, [canvasIndex, currentShapeIndex, shapeIndex, currentCanvasIndex]);

  return (
    <div
      ref={shapeRef}
      className={styles.shape}
      style={{ ...shape, border: isMouseHovered && SHAPE_STYLES.BORDER }}
      draggable={false}
      onMouseEnter={() => {
        dispatch(deactivateSelector());
        dispatch(
          setHoveredShape({
            canvasIndex: currentCanvasIndex,
            shapeIndex: currentShapeIndex,
          })
        );
        setIsMouseHovered(true);
      }}
      onMouseLeave={() => {
        dispatch(activateSelector());
        dispatch(
          setHoveredShape({
            canvasIndex: null,
            shapeIndex: null,
          })
        );
        setIsMouseHovered(false);
      }}
      onClick={() => {
        if (workingCanvasIndex === currentCanvasIndex) {
          return dispatch(replaceSelectedShapeIndexes(currentShapeIndex));
        }

        dispatch(setWorkingCanvasIndex(currentCanvasIndex));
        dispatch(replaceSelectedShapeIndexes(currentShapeIndex));
      }}
    ></div>
  );
}

export default Shape;
