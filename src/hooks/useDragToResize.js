import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import directions from "../constants/directions";
import {
  resizeEast,
  resizeNorth,
  resizeNorthEast,
  resizeNorthWest,
  resizeSouth,
  resizeSouthEast,
  resizeSouthWest,
  resizeWest,
} from "../features/canvas/canvasSlice";
import {
  selectCurrentScale,
  selectCurrentWorkingCanvasIndex,
  selectSelectedShapeIndexes,
} from "../features/utility/utilitySlice";
import { batchGroupBy } from "../utilities/batchActions";

function useDragToResize(pointerRef, direction) {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);
  const workingCanvasIndex = useSelector(selectCurrentWorkingCanvasIndex);
  const selectedShapeIndexes = useSelector(selectSelectedShapeIndexes);

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
    pointerRef,
    selectedShapeIndexes,
    workingCanvasIndex,
  ]);
}

export default useDragToResize;
