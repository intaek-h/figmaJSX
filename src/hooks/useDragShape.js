import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import tools from "../constants/tools";
import { modifyShape, selectAllCanvas } from "../features/canvas/canvasSlice";
import {
  selectCurrentScale,
  selectCurrentTool,
  selectIsDragScrolling,
} from "../features/utility/utilitySlice";

let selectionLocked = false;

function useDragShape(shapeRef, canvasIndex, shapeIndex) {
  const dispatch = useDispatch();

  const currentTool = useSelector(selectCurrentTool);
  const currentScale = useSelector(selectCurrentScale);
  const isDragScrolling = useSelector(selectIsDragScrolling);
  const canvases = useSelector(selectAllCanvas);

  useEffect(() => {
    if (!shapeRef.current || isDragScrolling || currentTool !== tools.SELECTOR)
      return;

    const shape = shapeRef.current;
    let movedTop;
    let movedLeft;

    const handleMouseDown = (e) => {
      e.stopPropagation();
      const originalElPositionTop = e.currentTarget.offsetTop;
      const originalElPositionLeft = e.currentTarget.offsetLeft;
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;

      selectionLocked = true;

      const handleMouseMove = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        shape.style.transform = `translate(${movedLeft}px, ${movedTop}px)`;
      };

      const handleMouseUp = () => {
        if (!selectionLocked) return;

        const newShapeTop = originalElPositionTop + movedTop;
        const newShapeLeft = originalElPositionLeft + movedLeft;

        shape.style.removeProperty("transform");

        if (movedTop || movedLeft) {
          dispatch(
            modifyShape({
              top: newShapeTop,
              left: newShapeLeft,
              canvasIndex,
              shapeIndex,
            })
          );
        }

        movedTop = 0;
        movedLeft = 0;
        selectionLocked = false;

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    shape.addEventListener("mousedown", handleMouseDown);

    return () => {
      shape.removeEventListener("mousedown", handleMouseDown);
    };
  }, [
    canvasIndex,
    currentScale,
    currentTool,
    dispatch,
    isDragScrolling,
    shapeIndex,
    shapeRef,
    canvases,
  ]);
}

export default useDragShape;
