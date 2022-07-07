import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CANVAS_PREVIEW_STYLES,
  SIZE_PREVIEW_STYLES,
} from "../constants/styles";

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
      canvasPreview.style.backgroundColor = CANVAS_PREVIEW_STYLES.BG_COLOR;
      canvasPreview.style.border = CANVAS_PREVIEW_STYLES.BORDER;
      canvasPreview.style.position = CANVAS_PREVIEW_STYLES.POSITION;
      canvasPreview.style.boxSizing = CANVAS_PREVIEW_STYLES.BOX_SIZING;

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
        sizePreview.style.position = SIZE_PREVIEW_STYLES.POSITION;
        sizePreview.style.top = top + height + 10 + "px";
        sizePreview.style.left = left + width + 10 + "px";
        sizePreview.style.backgroundColor = SIZE_PREVIEW_STYLES.BG_COLOR;
        sizePreview.style.color = SIZE_PREVIEW_STYLES.COLOR;
        sizePreview.style.fontSize =
          currentScale >= 1
            ? SIZE_PREVIEW_STYLES.FONT_SIZE
            : `${Math.floor(SIZE_PREVIEW_STYLES.WEIGHT / currentScale)}px`;
        sizePreview.style.padding = SIZE_PREVIEW_STYLES.PADDING;
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
