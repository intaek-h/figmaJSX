import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { modifyCanvas } from "../features/canvas/canvasSlice";
import { selectCurrentScale } from "../features/utility/utilitySlice";

function useDragCanvas(canvasRef, canvasNameRef, canvasIndex) {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);

  useEffect(() => {
    if (!canvasNameRef.current || !canvasRef.current) return;

    const canvasName = canvasNameRef.current;
    const canvas = canvasRef.current;

    let movedTop;
    let movedLeft;

    const handleMouseDown = (e) => {
      const originalElPositionTop = e.currentTarget.offsetTop;
      const originalElPositionLeft = e.currentTarget.offsetLeft;
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;

      canvasName.style.opacity = 0.5;

      const handleMouseMove = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        canvasName.style.transform = `translate(${movedLeft}px, calc(${movedTop}px - 100%))`;
        canvas.style.transform = `translate(${movedLeft}px, ${movedTop}px)`;
      };

      const handleMouseUp = () => {
        const newShapeTop = originalElPositionTop + movedTop;
        const newShapeLeft = originalElPositionLeft + movedLeft;

        canvasName.style.removeProperty("transform");
        canvasName.style.removeProperty("opacity");
        canvas.style.removeProperty("transform");

        if (movedTop || movedLeft) {
          dispatch(
            modifyCanvas({
              top: newShapeTop,
              left: newShapeLeft,
              canvasIndex,
            })
          );
        }

        movedTop = 0;
        movedLeft = 0;

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    canvasName.addEventListener("mousedown", handleMouseDown);

    return () => canvasName.removeEventListener("mouseDown", handleMouseDown);
  }, [currentScale, dispatch, canvasIndex, canvasNameRef, canvasRef]);
}

export default useDragCanvas;
