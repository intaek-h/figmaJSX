import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addShape } from "../features/canvas/canvasSlice";
import {
  selectGlobalColor,
  selectGlobalFontSize,
} from "../features/globalStyles/globalStylesSlice";
import {
  setInputFieldBlurred,
  setInputFieldFocused,
  selectCurrentScale,
  selectCurrentTool,
  selectIsDragScrolling,
  setCurrentTool,
  selectIsSelectorActivated,
} from "../features/utility/utilitySlice";
import computePreviewElement from "../utilities/computePreviewElement";
import computePreviewLine from "../utilities/computePreviewLine";
import tools from "../constants/tools";

function useDrawShape(elementRef, canvasIndex) {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);
  const globalColor = useSelector(selectGlobalColor);
  const globalFontSize = useSelector(selectGlobalFontSize);
  const currentTool = useSelector(selectCurrentTool);
  const isDragScrolling = useSelector(selectIsDragScrolling);
  const isSelectorActivated = useSelector(selectIsSelectorActivated);

  useEffect(() => {
    if (!elementRef.current || isDragScrolling) return;

    const element = elementRef.current;

    const handleMouseDownSelector = (e) => {
      const previewShape = document.createElement("div");
      const elementFigures = element.getBoundingClientRect();
      const elementTop = elementFigures.top;
      const elementLeft = elementFigures.left;
      const startTop = (e.clientY - elementTop) / currentScale;
      const startLeft = (e.clientX - elementLeft) / currentScale;

      previewShape.style.top = startTop + "px";
      previewShape.style.left = startLeft + "px";
      previewShape.style.backgroundColor = "#4faaff36";
      previewShape.style.border = "1px solid #94beff";
      previewShape.style.position = "absolute";
      previewShape.style.boxSizing = "border-box";

      element.appendChild(previewShape);

      const handleMouseMove = (e) => {
        const { height, left, top, width } = computePreviewElement(
          { x: startLeft, y: startTop },
          {
            x: (e.clientX - elementLeft) / currentScale,
            y: (e.clientY - elementTop) / currentScale,
          }
        );

        previewShape.style.height = height + "px";
        previewShape.style.width = width + "px";
        previewShape.style.top = top + "px";
        previewShape.style.left = left + "px";
      };

      const handleMouseUp = () => {
        if (e.button === 2) {
          previewShape.remove();
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseup", handleMouseUp);
          return;
        }

        previewShape.remove();
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseup", handleMouseUp);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDownRectangle = (e) => {
      const previewShape = document.createElement("div");
      const elementFigures = element.getBoundingClientRect();
      const elementTop = elementFigures.top;
      const elementLeft = elementFigures.left;
      const startTop = (e.clientY - elementTop) / currentScale;
      const startLeft = (e.clientX - elementLeft) / currentScale;

      previewShape.style.top = startTop + "px";
      previewShape.style.left = startLeft + "px";
      previewShape.style.backgroundColor = globalColor;
      previewShape.style.border = `1px solid #94beff`;
      previewShape.style.position = "absolute";
      previewShape.style.boxSizing = "border-box";

      element.appendChild(previewShape);

      const handleMouseMove = (e) => {
        const { height, left, top, width } = computePreviewElement(
          { x: startLeft, y: startTop },
          {
            x: (e.clientX - elementLeft) / currentScale,
            y: (e.clientY - elementTop) / currentScale,
          }
        );

        previewShape.style.height = height + "px";
        previewShape.style.width = width + "px";
        previewShape.style.top = top + "px";
        previewShape.style.left = left + "px";
      };

      const handleMouseUp = () => {
        if (e.button === 2) {
          previewShape.remove();
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseup", handleMouseUp);
          return;
        }

        const coordinates = {
          type: tools.RECTANGLE,
          name: tools.RECTANGLE,
          top: previewShape.offsetTop,
          left: previewShape.offsetLeft,
          height: previewShape.offsetHeight,
          width: previewShape.offsetWidth,
          backgroundColor: globalColor,
          canvasIndex,
        };

        coordinates.height + coordinates.width > 4 &&
          dispatch(addShape(coordinates));

        previewShape.remove();
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseup", handleMouseUp);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDownEllipse = (e) => {
      const previewShape = document.createElement("div");
      const elementFigures = element.getBoundingClientRect();
      const elementTop = elementFigures.top;
      const elementLeft = elementFigures.left;
      const startTop = (e.clientY - elementTop) / currentScale;
      const startLeft = (e.clientX - elementLeft) / currentScale;

      previewShape.style.top = startTop + "px";
      previewShape.style.left = startLeft + "px";
      previewShape.style.backgroundColor = "#4faaff36";
      previewShape.style.border = "1px solid #94beff";
      previewShape.style.borderRadius = "50%";
      previewShape.style.position = "absolute";
      previewShape.style.boxSizing = "border-box";

      element.appendChild(previewShape);

      const handleMouseMove = (e) => {
        const { height, left, top, width } = computePreviewElement(
          { x: startLeft, y: startTop },
          {
            x: (e.clientX - elementLeft) / currentScale,
            y: (e.clientY - elementTop) / currentScale,
          }
        );

        previewShape.style.height = height + "px";
        previewShape.style.width = width + "px";
        previewShape.style.top = top + "px";
        previewShape.style.left = left + "px";
      };

      const handleMouseUp = () => {
        if (e.button === 2) {
          previewShape.remove();
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseup", handleMouseUp);
          return;
        }

        const coordinates = {
          type: tools.ELLIPSE,
          name: tools.ELLIPSE,
          top: previewShape.offsetTop,
          left: previewShape.offsetLeft,
          height: previewShape.offsetHeight,
          width: previewShape.offsetWidth,
          borderRadius: "50%",
          backgroundColor: globalColor,
          canvasIndex,
        };

        coordinates.height + coordinates.width > 4 &&
          dispatch(addShape(coordinates));

        previewShape.remove();
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseup", handleMouseUp);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDownLine = (e) => {
      const previewShape = document.createElement("div");
      const elementFigures = element.getBoundingClientRect();
      const elementTop = elementFigures.top;
      const elementLeft = elementFigures.left;
      const startTop = (e.clientY - elementTop) / currentScale;
      const startLeft = (e.clientX - elementLeft) / currentScale;

      previewShape.style.top = startTop + "px";
      previewShape.style.left = startLeft + "px";
      previewShape.style.backgroundColor = "#4faaff36";
      previewShape.style.position = "absolute";

      element.appendChild(previewShape);

      const handleMouseMove = (e) => {
        const { height, width } = computePreviewLine(
          {
            x: (e.clientX - elementLeft) / currentScale,
            y: (e.clientY - elementTop) / currentScale,
          },
          { x: startLeft, y: startTop }
        );

        previewShape.style.height = height + "px";
        previewShape.style.width = width + "px";
        previewShape.style.top = startTop + "px";
        previewShape.style.left = startLeft + "px";

        if (height < width) {
          previewShape.style.height = 1 + "px";
        } else {
          previewShape.style.width = 1 + "px";
        }
      };

      const handleMouseUp = () => {
        if (e.button === 2) {
          previewShape.remove();
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseup", handleMouseUp);
          return;
        }

        const coordinates = {
          type: tools.LINE,
          name: tools.LINE,
          top: previewShape.offsetTop,
          left: previewShape.offsetLeft,
          height: previewShape.offsetHeight,
          width: previewShape.offsetWidth,
          backgroundColor: globalColor,
          canvasIndex,
        };

        coordinates.height + coordinates.width > 4 &&
          dispatch(addShape(coordinates));

        previewShape.remove();
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseup", handleMouseUp);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseup", handleMouseUp);
    };

    const handleClickText = (e) => {
      const form = document.createElement("form");
      const previewText = document.createElement("div");
      const elementFigures = element.getBoundingClientRect();
      const elementTop = elementFigures.top;
      const elementLeft = elementFigures.left;
      const startTop = (e.clientY - elementTop) / currentScale;
      const startLeft = (e.clientX - elementLeft) / currentScale;

      previewText.contentEditable = "plaintext-only";
      previewText.style.minWidth = "10px";
      previewText.style.left = startLeft + "px";
      previewText.style.position = "absolute";
      previewText.style.fontSize = globalFontSize + "px";
      previewText.style.backgroundColor = "transparent";
      previewText.style.margin = 0;
      previewText.style.padding = 0;
      previewText.style.border = "none";
      previewText.style.borderBottom = "1px dotted black";
      previewText.style.outline = "none";

      form.appendChild(previewText);
      element.appendChild(form);

      previewText.style.top = startTop - previewText.clientHeight + "px";

      dispatch(setInputFieldFocused());
      dispatch(setCurrentTool(tools.SELECTOR));

      previewText.addEventListener("blur", handleBlur, { once: true });

      function handleBlur() {
        if (!previewText.innerText) {
          dispatch(setInputFieldBlurred());
          previewText.remove();
          form.remove();
          return;
        }

        const coordinates = {
          type: tools.TEXT,
          name: tools.TEXT,
          top: previewText.offsetTop,
          left: previewText.offsetLeft,
          text: previewText.innerText,
          color: globalColor,
          fontSize: globalFontSize,
          canvasIndex,
        };

        dispatch(addShape(coordinates));
        dispatch(setInputFieldBlurred());
        previewText.remove();
        form.remove();
      }
    };

    if (currentTool === tools.SELECTOR) {
      if (!isSelectorActivated) return;

      element.style.cursor = "default";
      element.addEventListener("mousedown", handleMouseDownSelector);

      return () =>
        element.removeEventListener("mousedown", handleMouseDownSelector);
    }
    if (currentTool === tools.RECTANGLE) {
      element.style.cursor = "crosshair";
      element.addEventListener("mousedown", handleMouseDownRectangle);

      return () =>
        element.removeEventListener("mousedown", handleMouseDownRectangle);
    }
    if (currentTool === tools.ELLIPSE) {
      element.style.cursor = "crosshair";
      element.addEventListener("mousedown", handleMouseDownEllipse);

      return () =>
        element.removeEventListener("mousedown", handleMouseDownEllipse);
    }
    if (currentTool === tools.LINE) {
      element.style.cursor = "crosshair";
      element.addEventListener("mousedown", handleMouseDownLine);

      return () =>
        element.removeEventListener("mousedown", handleMouseDownLine);
    }
    if (currentTool === tools.TEXT) {
      element.style.cursor = "text";
      element.addEventListener("mousedown", handleClickText);

      return () => element.removeEventListener("mousedown", handleClickText);
    }
  }, [
    currentScale,
    currentTool,
    dispatch,
    elementRef,
    globalColor,
    globalFontSize,
    canvasIndex,
    isDragScrolling,
    isSelectorActivated,
  ]);
}

export default useDrawShape;
