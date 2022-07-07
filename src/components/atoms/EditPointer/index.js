import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import directions from "../../../constants/directions";
import { EDIT_POINTER_STYLES } from "../../../constants/styles";
import {
  resizeEast,
  resizeNorth,
  resizeNorthEast,
  resizeNorthWest,
  resizeSouth,
  resizeSouthEast,
  resizeSouthWest,
  resizeWest,
} from "../../../features/canvas/canvasSlice";
import {
  selectCurrentScale,
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
} from "../../../features/utility/utilitySlice";
import { batchGroupBy } from "../../../utilities/batchActions";

function EditPointer({ direction, ...shape }) {
  const position = {};

  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);

  const pointerRef = useRef();

  useEffect(() => {
    if (!pointerRef.current) return;

    const pointer = pointerRef.current;

    const handleMouseDown = (e) => {
      e.stopPropagation();

      const randomID = Math.floor(Math.random() * 100000);
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;

      let movedTop;
      let movedLeft;
      let prevMovedTop = 0;
      let prevMovedLeft = 0;

      batchGroupBy.start(randomID);

      const handleMouseMove = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        if (direction === directions.N) {
          dispatch(
            resizeNorth({
              canvasIndex: workingCanvasIndex,
              shapeIndexes: selectedShapeIndexes,
              change: movedTop - prevMovedTop,
            })
          );
        } else if (direction === directions.E) {
          dispatch(
            resizeEast({
              canvasIndex: workingCanvasIndex,
              shapeIndexes: selectedShapeIndexes,
              change: movedLeft - prevMovedLeft,
            })
          );
        } else if (direction === directions.S) {
          dispatch(
            resizeSouth({
              canvasIndex: workingCanvasIndex,
              shapeIndexes: selectedShapeIndexes,
              change: movedTop - prevMovedTop,
            })
          );
        } else if (direction === directions.W) {
          dispatch(
            resizeWest({
              canvasIndex: workingCanvasIndex,
              shapeIndexes: selectedShapeIndexes,
              change: movedLeft - prevMovedLeft,
            })
          );
        } else if (direction === directions.NE) {
          dispatch(
            resizeNorthEast({
              canvasIndex: workingCanvasIndex,
              shapeIndexes: selectedShapeIndexes,
              verChange: movedTop - prevMovedTop,
              horChange: movedLeft - prevMovedLeft,
            })
          );
        } else if (direction === directions.SE) {
          dispatch(
            resizeSouthEast({
              canvasIndex: workingCanvasIndex,
              shapeIndexes: selectedShapeIndexes,
              verChange: movedTop - prevMovedTop,
              horChange: movedLeft - prevMovedLeft,
            })
          );
        } else if (direction === directions.NW) {
          dispatch(
            resizeNorthWest({
              canvasIndex: workingCanvasIndex,
              shapeIndexes: selectedShapeIndexes,
              verChange: movedTop - prevMovedTop,
              horChange: movedLeft - prevMovedLeft,
            })
          );
        } else if (direction === directions.SW) {
          dispatch(
            resizeSouthWest({
              canvasIndex: workingCanvasIndex,
              shapeIndexes: selectedShapeIndexes,
              verChange: movedTop - prevMovedTop,
              horChange: movedLeft - prevMovedLeft,
            })
          );
        }

        prevMovedTop = movedTop;
        prevMovedLeft = movedLeft;
      };

      const handleMouseUp = () => {
        batchGroupBy.end();

        window.removeEventListener("mousemove", handleMouseMove);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    pointer.addEventListener("mousedown", handleMouseDown);

    return () => pointer.removeEventListener("mousedown", handleMouseDown);
  }, [
    currentScale,
    direction,
    dispatch,
    selectedShapeIndexes,
    shape.left,
    shape.width,
    workingCanvasIndex,
  ]);

  switch (direction) {
    case directions.N:
      position.top = shape.top - 3;
      position.left = (shape.left + shape.width) / 2 - 3;
      position.cursor = "ns-resize";
      break;
    case directions.E:
      position.top = (shape.top + shape.height) / 2 - 3;
      position.left = shape.width - 3;
      position.cursor = "ew-resize";
      break;
    case directions.S:
      position.top = shape.height - 3;
      position.left = (shape.left + shape.width) / 2 - 3;
      position.cursor = "ns-resize";
      break;
    case directions.W:
      position.top = (shape.top + shape.height) / 2 - 3;
      position.left = shape.left - 3;
      position.cursor = "ew-resize";
      break;
    case directions.NE:
      position.top = shape.top - 3;
      position.left = shape.width - 3;
      position.cursor = "nesw-resize";
      break;
    case directions.NW:
      position.top = shape.top - 3;
      position.left = shape.left - 3;
      position.cursor = "nwse-resize";
      break;
    case directions.SE:
      position.top = shape.height - 3;
      position.left = shape.width - 3;
      position.cursor = "nwse-resize";
      break;
    case directions.SW:
      position.top = shape.height - 3;
      position.left = shape.left - 3;
      position.cursor = "nesw-resize";
      break;
  }

  const style = {
    top: position.top,
    left: position.left,
    width: EDIT_POINTER_STYLES.WIDTH,
    height: EDIT_POINTER_STYLES.HEIGHT,
    backgroundColor: EDIT_POINTER_STYLES.BG_COLOR,
    position: EDIT_POINTER_STYLES.POSITION,
    border: EDIT_POINTER_STYLES.BORDER,
    cursor: position.cursor,
  };

  return <div ref={pointerRef} style={style} draggable={false}></div>;
}

export default EditPointer;
