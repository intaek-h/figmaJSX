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

  const handleMouseEnter = () => {
    dispatch(deactivateSelector());
    dispatch(
      setHoveredShape({
        canvasIndex: currentCanvasIndex,
        shapeIndex: currentShapeIndex,
      })
    );
    setIsMouseHovered(true);
  };

  const handleMouseLeave = () => {
    dispatch(activateSelector());
    dispatch(
      setHoveredShape({
        canvasIndex: null,
        shapeIndex: null,
      })
    );
    setIsMouseHovered(false);
  };

  const handleClick = () => {
    if (workingCanvasIndex === currentCanvasIndex) {
      return dispatch(replaceSelectedShapeIndexes(currentShapeIndex));
    }

    dispatch(setWorkingCanvasIndex(currentCanvasIndex));
    dispatch(replaceSelectedShapeIndexes(currentShapeIndex));
  };

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
      data-testid="shape"
      className={styles.shape}
      style={{ ...shape, border: isMouseHovered && SHAPE_STYLES.BORDER }}
      draggable={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    ></div>
  );
}

export default Shape;
