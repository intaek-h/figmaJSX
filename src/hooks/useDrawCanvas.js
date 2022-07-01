import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import tools from "../constants/tools";
import { createCanvas } from "../features/canvas/canvasSlice";
import {
  selectCurrentScale,
  selectCurrentTool,
  selectIsDragScrolling,
} from "../features/utility/utilitySlice";
import computePreviewElement from "../utilities/computePreviewElement";

function useDrawCanvas(elementRef) {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);
  const currentTool = useSelector(selectCurrentTool);
  const isDragScrolling = useSelector(selectIsDragScrolling);

  useEffect(() => {
    if (!elementRef.current || currentTool !== tools.CANVAS) return;

    const element = elementRef.current;

    const handleMouseDownCanvas = (e) => {
      if (isDragScrolling) return;

      const canvasPreview = document.createElement("div");
      const artboardNode = element.getBoundingClientRect();
      const artboardTop = artboardNode.top;
      const artboardLeft = artboardNode.left;
      const startTop = (e.clientY - artboardTop) / currentScale;
      const startLeft = (e.clientX - artboardLeft) / currentScale;

      canvasPreview.style.top = startTop + "px";
      canvasPreview.style.left = startLeft + "px";
      canvasPreview.style.backgroundColor = "#4faaff36";
      canvasPreview.style.border = "1px solid #94beff";
      canvasPreview.style.position = "absolute";
      canvasPreview.style.boxSizing = "border-box";

      const sizePreview = document.createElement("div");

      element.appendChild(canvasPreview);
      element.appendChild(sizePreview);

      const handleMouseMove = (e) => {
        const { height, left, top, width } = computePreviewElement(
          { x: startLeft, y: startTop },
          {
            x: (e.clientX - artboardLeft) / currentScale,
            y: (e.clientY - artboardTop) / currentScale,
          }
        );

        canvasPreview.style.height = height + "px";
        canvasPreview.style.width = width + "px";
        canvasPreview.style.top = top + "px";
        canvasPreview.style.left = left + "px";

        sizePreview.textContent = `${width} X ${height}`;
        sizePreview.style.position = "absolute";
        sizePreview.style.top = top + height + 10 + "px";
        sizePreview.style.left = left + width + 10 + "px";
        sizePreview.style.backgroundColor = "black";
        sizePreview.style.color = "white";
        sizePreview.style.fontSize =
          currentScale >= 1 ? "10px" : `${Math.floor(20 / currentScale)}px`;
        sizePreview.style.opacity = 0.3;
        sizePreview.style.padding = "0 2px";
      };

      const handleMouseUp = (e) => {
        if (e.button === 2) {
          canvasPreview.remove();
          sizePreview.remove();
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseup", handleMouseUp);
          return;
        }

        const coordinates = {
          top: canvasPreview.offsetTop,
          left: canvasPreview.offsetLeft,
          height: canvasPreview.offsetHeight,
          width: canvasPreview.offsetWidth,
        };

        coordinates.height + coordinates.width > 4 &&
          dispatch(createCanvas(coordinates));

        canvasPreview.remove();
        sizePreview.remove();
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseup", handleMouseUp);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseup", handleMouseUp);
    };

    element.addEventListener("mousedown", handleMouseDownCanvas);

    return () =>
      element.removeEventListener("mousedown", handleMouseDownCanvas);
  }, [currentScale, currentTool, dispatch, elementRef, isDragScrolling]);
}

export default useDrawCanvas;
