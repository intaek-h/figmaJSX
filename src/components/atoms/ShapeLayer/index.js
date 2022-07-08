import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import tools from "../../../constants/tools";
import { changeShapeIndex } from "../../../features/canvas/canvasSlice";
import {
  replaceSelectedShapeIndexes,
  selectCurrentTool,
  selectCurrentWorkingCanvasIndex,
  selectHoveredShape,
  selectSelectedShapeIndexes,
  setHoveredShape,
  setWorkingCanvasIndex,
} from "../../../features/utility/utilitySlice";
import styles from "./ShapeLayer.module.scss";

function ShapeLayer({ name, currentCanvasIndex, currentShapeIndex }) {
  const dispatch = useDispatch();

  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const { canvasIndex, shapeIndex } = useSelector(selectHoveredShape);
  const currentTool = useSelector(selectCurrentTool);

  const layerRef = useRef();

  const isMouseHovered =
    canvasIndex === currentCanvasIndex && shapeIndex === currentShapeIndex;

  const handleMouseEnter = () => {
    dispatch(
      setHoveredShape({
        canvasIndex: currentCanvasIndex,
        shapeIndex: currentShapeIndex,
      })
    );
  };

  const handleMouseLeave = () => {
    dispatch(
      setHoveredShape({
        canvasIndex: null,
        shapeIndex: null,
      })
    );
  };

  const handleClick = () => {
    if (workingCanvasIndex === currentCanvasIndex) {
      return dispatch(replaceSelectedShapeIndexes(currentShapeIndex));
    }

    dispatch(setWorkingCanvasIndex(currentCanvasIndex));
    dispatch(replaceSelectedShapeIndexes(currentShapeIndex));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    if (!layerRef.current) return;

    e.target.classList.add(styles.grabbing);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text", layerRef.current.dataset.position);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove(styles.grabbing);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    const originalIndex = Number(e.dataTransfer.getData("text"));
    const targetIndex = Number(e.target.dataset.position);

    dispatch(
      changeShapeIndex({
        canvasIdx: currentCanvasIndex,
        fromIdx: originalIndex,
        toIdx: targetIndex,
      })
    );
  };

  let className = styles.layer;

  if (
    isMouseHovered &&
    workingCanvasIndex === currentCanvasIndex &&
    selectedShapeIndexes.includes(currentShapeIndex)
  ) {
    className = `${styles.layer} ${styles.selected} ${styles.hovered}`;
  } else if (isMouseHovered) {
    className = `${styles.layer} ${styles.hovered}`;
  } else if (
    workingCanvasIndex === currentCanvasIndex &&
    selectedShapeIndexes.includes(currentShapeIndex)
  ) {
    className = `${styles.layer} ${styles.selected}`;
  }

  return (
    <div
      className={className}
      ref={layerRef}
      data-position={currentShapeIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      draggable={currentTool === tools.SELECTOR ? "true" : "false"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {name}
    </div>
  );
}

export default ShapeLayer;
