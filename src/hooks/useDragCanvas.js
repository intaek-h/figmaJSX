import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CANVAS_NAME_STYLES } from "../constants/styles";

import { modifyCanvas } from "../features/canvas/canvasSlice";
import { selectCurrentScale } from "../features/utility/utilitySlice";

function useDragCanvas(
  canvasRef,
  canvasNameRef,
  canvasIndex,
  isRendered = true
) {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);

  useEffect(() => {
    if (!canvasNameRef.current || !canvasRef.current || !isRendered) return;

    const canvasName = canvasNameRef.current;
    const canvas = canvasRef.current;

    let movedTop;
    let movedLeft;
    let lastAnimationFrame;

    const handleMouseDown = (e) => {
      const originalElPositionTop = e.currentTarget.offsetTop;
      const originalElPositionLeft = e.currentTarget.offsetLeft;
      const originalMousePositionTop = e.clientY;
      const originalMousePositionLeft = e.clientX;

      canvasName.style.opacity = CANVAS_NAME_STYLES.OPACITY;

      const handleMouseMove = (e) => {
        movedTop = (e.clientY - originalMousePositionTop) / currentScale;
        movedLeft = (e.clientX - originalMousePositionLeft) / currentScale;

        if (lastAnimationFrame) cancelAnimationFrame(lastAnimationFrame);

        lastAnimationFrame = requestAnimationFrame(() => {
          renderNextAnimationFrame();
          lastAnimationFrame = null;
        });
      };

      const renderNextAnimationFrame = () => {
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
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    canvasName.addEventListener("mousedown", handleMouseDown);

    return () => canvasName.removeEventListener("mouseDown", handleMouseDown);
  }, [
    currentScale,
    dispatch,
    canvasIndex,
    canvasNameRef,
    canvasRef,
    isRendered,
  ]);
}

export default useDragCanvas;
