import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import directions from "../../../constants/directions";

import {
  activateSelector,
  deactivateSelector,
  replaceSelectedShapeIndexes,
  selectCurrentWorkingCanvasIndex,
  selectHoveredShape,
  selectSelectedShapeIndexes,
  setHoveredShape,
  setWorkingCanvasIndex,
} from "../../../features/utility/utilitySlice";
import useDragShape from "../../../hooks/useDragShape";
import EditPointer from "../EditPointer";
import styles from "./Shape.module.scss";

function Shape({
  canvasIndex: currentCanvasIndex,
  shapeIndex: currentShapeIndex,
  ...shape
}) {
  const dispatch = useDispatch();

  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const { canvasIndex, shapeIndex } = useSelector(selectHoveredShape);

  const shapeRef = useRef();

  const [isMouseHovered, setIsMouseHovered] = useState(false);

  useDragShape(shapeRef, currentCanvasIndex, currentShapeIndex);

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
    <>
      <div
        ref={shapeRef}
        className={styles.shape}
        style={{ ...shape, border: isMouseHovered && "2px solid #1673ff" }}
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
      {workingCanvasIndex === currentCanvasIndex &&
        selectedShapeIndexes.includes(currentShapeIndex) &&
        directions.map((direction) => (
          <EditPointer direction={direction} key={direction} {...shape} />
        ))}
    </>
  );
}

export default Shape;
