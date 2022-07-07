import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addShape } from "../features/canvas/canvasSlice";
import {
  selectGlobalColor,
  selectGlobalFontSize,
  selectGlobalThickness,
} from "../features/globalStyles/globalStylesSlice";
import {
  setInputFieldBlurred,
  setInputFieldFocused,
  selectCurrentScale,
  selectCurrentTool,
  selectIsDragScrolling,
  setCurrentTool,
  selectIsSelectorActivated,
  replaceSelectedShapeIndexes,
  emptySelectedShapeIndexes,
  setWorkingCanvasIndex,
} from "../features/utility/utilitySlice";
import computePreviewElement from "../utilities/computePreviewElement";
import computePreviewLine from "../utilities/computePreviewLine";
import computeIntersection from "../utilities/computeIntersection";
import tools from "../constants/tools";
import {
  ELLIPSE_PREVIEW_STYLES,
  LINE_PREVIEW_STYLES,
  RECTANGLE_PREVIEW_STYLES,
  SELECTOR_STYLES,
  TEXT_PREVIEW_STYLES,
} from "../constants/styles";

function useDrawShape(elementRef, canvasIndex, shapes) {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);
  const globalColor = useSelector(selectGlobalColor);
  const globalFontSize = useSelector(selectGlobalFontSize);
  const globalThickness = useSelector(selectGlobalThickness);
  const currentTool = useSelector(selectCurrentTool);
  const isDragScrolling = useSelector(selectIsDragScrolling);
  const isSelectorActivated = useSelector(selectIsSelectorActivated);

  useEffect(() => {
    if (!elementRef.current || isDragScrolling) return;

    const element = elementRef.current;

    const handleMouseDownSelector = (e) => {
      e.stopPropagation();
      const previewShape = document.createElement("div");
      const elementFigures = element.getBoundingClientRect();
      const elementTop = elementFigures.top;
      const elementLeft = elementFigures.left;
      const startTop = (e.clientY - elementTop) / currentScale;
      const startLeft = (e.clientX - elementLeft) / currentScale;

      previewShape.style.top = startTop + "px";
      previewShape.style.left = startLeft + "px";
      previewShape.style.backgroundColor = SELECTOR_STYLES.BG_COLOR;
      previewShape.style.border = SELECTOR_STYLES.BORDER;
      previewShape.style.position = SELECTOR_STYLES.POSITION;
      previewShape.style.boxSizing = SELECTOR_STYLES.BOX_SIZING;

      element.appendChild(previewShape);

      const handleMouseMove = (e) => {
        const previewShapeStyles = computePreviewElement(
          { x: startLeft, y: startTop },
          {
            x: (e.clientX - elementLeft) / currentScale,
            y: (e.clientY - elementTop) / currentScale,
          }
        );

        const selectedShapeIndexes = [];

        shapes.forEach((shape, i) => {
          if (computeIntersection(previewShapeStyles, shape)) {
            selectedShapeIndexes.push(i);
          }
        });

        dispatch(replaceSelectedShapeIndexes([...selectedShapeIndexes]));

        previewShape.style.height = previewShapeStyles.height + "px";
        previewShape.style.width = previewShapeStyles.width + "px";
        previewShape.style.top = previewShapeStyles.top + "px";
        previewShape.style.left = previewShapeStyles.left + "px";
      };

      const handleMouseUp = () => {
        if (e.button === 2) {
          previewShape.remove();
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
          return;
        }

        previewShape.remove();
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
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
      previewShape.style.border = RECTANGLE_PREVIEW_STYLES.BORDER;
      previewShape.style.position = RECTANGLE_PREVIEW_STYLES.POSITION;
      previewShape.style.boxSizing = RECTANGLE_PREVIEW_STYLES.BOX_SIZING;

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
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
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
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
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
      previewShape.style.backgroundColor = globalColor;
      previewShape.style.border = ELLIPSE_PREVIEW_STYLES.BORDER;
      previewShape.style.borderRadius = ELLIPSE_PREVIEW_STYLES.BORDER_RADIUS;
      previewShape.style.position = ELLIPSE_PREVIEW_STYLES.POSITION;
      previewShape.style.boxSizing = ELLIPSE_PREVIEW_STYLES.BOX_SIZING;

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
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
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
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
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
      previewShape.style.backgroundColor = globalColor;
      previewShape.style.position = LINE_PREVIEW_STYLES.POSITION;

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
          previewShape.style.height = globalThickness + "px";
        } else {
          previewShape.style.width = globalThickness + "px";
        }
      };

      const handleMouseUp = () => {
        if (e.button === 2) {
          previewShape.remove();
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
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
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleClickText = (e) => {
      e.stopPropagation();
      const form = document.createElement("form");
      const previewText = document.createElement("div");
      const elementFigures = element.getBoundingClientRect();
      const elementTop = elementFigures.top;
      const elementLeft = elementFigures.left;
      const startTop = (e.clientY - elementTop) / currentScale;
      const startLeft = (e.clientX - elementLeft) / currentScale;

      previewText.contentEditable = TEXT_PREVIEW_STYLES.CONTENT_EDITABLE;
      previewText.style.minWidth = TEXT_PREVIEW_STYLES.MIN_WIDTH;
      previewText.style.left = startLeft + "px";
      previewText.style.position = TEXT_PREVIEW_STYLES.POSITION;
      previewText.style.fontSize = globalFontSize + "px";
      previewText.style.color = globalColor;
      previewText.style.caretColor = TEXT_PREVIEW_STYLES.CARET_COLOR;
      previewText.style.backgroundColor = TEXT_PREVIEW_STYLES.BG_COLOR;
      previewText.style.margin = TEXT_PREVIEW_STYLES.MARGIN;
      previewText.style.padding = TEXT_PREVIEW_STYLES.PADDING;
      previewText.style.border = TEXT_PREVIEW_STYLES.BORDER;
      previewText.style.borderBottom = TEXT_PREVIEW_STYLES.BORDER_BOTTOM;
      previewText.style.outline = TEXT_PREVIEW_STYLES.OUTLINE;

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
          height: previewText.clientHeight,
          width: previewText.clientWidth + 2,
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

      const resetSelection = (e) => {
        e.stopPropagation();
        dispatch(setWorkingCanvasIndex(canvasIndex));
        dispatch(emptySelectedShapeIndexes());
      };

      element.style.cursor = "default";
      element.addEventListener("mousedown", handleMouseDownSelector);
      element.addEventListener("mousedown", resetSelection);

      return () => {
        element.removeEventListener("mousedown", handleMouseDownSelector);
        element.removeEventListener("mousedown", resetSelection);
      };
    }
    if (currentTool === tools.RECTANGLE) {
      element.style.cursor = "crosshair";
      element.addEventListener("mousedown", handleMouseDownRectangle);

      return () => {
        element.removeEventListener("mousedown", handleMouseDownRectangle);
      };
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
    globalThickness,
    shapes,
  ]);
}

export default useDrawShape;
